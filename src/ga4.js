import gtag from './gtag';
import format from './format';

class GA4 {
  constructor() {
    this.reset();
  }

  reset = () => {
    this.isInitialized = false;

    this._testMode = false;
    this._current_GA_MEASUREMENT_ID;
    this._hasLoadedGA = false;
    this._isQueuing = false;
    this._queueGtag = [];
  };

  _gtag = (...args) => {
    if (!this._testMode) {
      if (this._isQueuing) {
        this._queueGtag.push(args);
      } else {
        gtag(...args);
      }
    } else {
      this._queueGtag.push(args);
    }
  };

  _loadGA = (GA_MEASUREMENT_ID) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (!this._hasLoadedGA) {
      // Global Site Tag (gtag.js) - Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.body.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      this._hasLoadedGA = true;
    }
  };

  _toGtagOptions = (gaOptions) => {
    if (!gaOptions) {
      return;
    }

    const mapFields = {
      // Old https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#cookieUpdate
      // New https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id#cookie_update
      cookieUpdate: 'cookie_update',
      cookieExpires: 'cookie_expires',
      cookieDomain: 'cookie_domain',
      cookiePrefix: 'cookie_prefix',
      cookieFlags: 'cookie_flags', // must be in set method?
      userId: 'user_id',
      clientId: 'client_id',
      anonymizeIp: 'anonymize_ip',
      contentGroup1: 'content_group1',
      contentGroup2: 'content_group2',
      contentGroup3: 'content_group3',
      contentGroup4: 'content_group4',
      // https://support.google.com/analytics/answer/9050852?hl=en
      allowAdFeatures: 'allow_google_signals',
      allowAdPersonalizationSignals: 'allow_ad_personalization_signals',
      nonInteraction: 'non_interaction',
      page: 'page_path',
    };

    const gtagOptions = Object.entries(gaOptions).reduce(
      (prev, [key, value]) => {
        if (mapFields[key]) {
          prev[mapFields[key]] = value;
        } else {
          prev[key] = value;
        }

        return prev;
      },
      {}
    );

    return gtagOptions;
  };

  /**
   *
   * @param {string} GA_MEASUREMENT_ID
   * @param {Object} options
   * @param {boolean} options.testMode
   * @param {Object} options.gaOptions
   * @param {boolean} options.gaOptions.cookieUpdate Default true
   * @param {Object} options.gtagOptions New parameter
   */
  initialize = (GA_MEASUREMENT_ID, options = {}) => {
    if (!GA_MEASUREMENT_ID) {
      throw new Error('Require GA_MEASUREMENT_ID');
    }

    this._current_GA_MEASUREMENT_ID = GA_MEASUREMENT_ID;
    const { testMode = false, gaOptions, gtagOptions } = options;
    this._testMode = testMode;

    const mergedGtagOptions = this._appendCustomMap({
      // https://developers.google.com/analytics/devguides/collection/gtagjs/pages#disable_pageview_measurement
      send_page_view: false, // default true, but React GA had false before.
      ...this._toGtagOptions(gaOptions),
      ...gtagOptions,
    });

    if (!testMode) {
      this._loadGA(this._current_GA_MEASUREMENT_ID, mergedGtagOptions);
    }
    if (!this.isInitialized) {
      this._gtag('js', new Date());
      this._gtag('config', this._current_GA_MEASUREMENT_ID, mergedGtagOptions);
    }
    this.isInitialized = true;

    if (!testMode) {
      const queues = [...this._queueGtag];
      this._queueGtag = [];
      this._isQueuing = false;
      while (queues.length) {
        const queue = queues.shift();
        this._gtag(...queue);
        if (queue[0] === 'get') {
          this._isQueuing = true;
        }
      }
    }
  };

  set = (fieldsObject) => {
    if (!fieldsObject) {
      console.warn('`fieldsObject` is required in .set()');

      return;
    }

    if (typeof fieldsObject !== 'object') {
      console.warn('Expected `fieldsObject` arg to be an Object');

      return;
    }

    if (Object.keys(fieldsObject).length === 0) {
      console.warn('empty `fieldsObject` given to .set()');
    }

    return this._gaCommand('set', fieldsObject);
  };

  _gaCommandSendEvent = (
    eventCategory,
    eventAction,
    eventLabel,
    eventValue,
    fieldsObject
  ) => {
    // need to change default value "(not set)" in category and label?
    // https://developers.google.com/analytics/devguides/collection/gtagjs/events#default-event-categories-and-labels
    this._gtag('event', eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue,
      ...(fieldsObject && { non_interaction: fieldsObject.nonInteraction }),
      ...this._toGtagOptions(fieldsObject),
    });
  };

  _gaCommandSendEventParameters = (...args) => {
    if (typeof args[0] === 'string') {
      this._gaCommandSendEvent(...args.slice(1));
    } else {
      const {
        eventCategory,
        eventAction,
        eventLabel,
        eventValue,
        // eslint-disable-next-line no-unused-vars
        hitType,
        ...rest
      } = args[0];
      this._gaCommandSendEvent(
        eventCategory,
        eventAction,
        eventLabel,
        eventValue,
        rest
      );
    }
  };

  _gaCommandSendTiming = (
    timingCategory,
    timingVar,
    timingValue,
    timingLabel
  ) => {
    this._gtag('event', 'timing_complete', {
      name: timingVar,
      value: timingValue,
      event_category: timingCategory,
      event_label: timingLabel,
    });
  };

  _gaCommandSendPageview = (pageTitle, pageLocation, pagePath) => {
    if (pageTitle || pageLocation || pagePath) {
      this._gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: pageLocation,
        page_path: pagePath,
      });
    } else {
      this._gtag('event', 'page_view');
    }
  };

  // https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#send
  _gaCommandSend = (...args) => {
    const hitType = typeof args[0] === 'string' ? args[0] : args[0].hitType;

    switch (hitType) {
      case 'event':
        this._gaCommandSendEventParameters(...args);
        break;
      case 'pageview':
        this._gaCommandSendPageview(...args.slice(1));
        break;
      case 'timing':
        this._gaCommandSendTiming(...args.slice(1));
        break;
      case 'screenview':
      case 'transaction':
      case 'item':
      case 'social':
      case 'exception':
        console.warn(`Unsupported send command: ${hitType}`);
        break;
      default:
        console.warn(`Send command doesn't exist: ${hitType}`);
    }
  };

  _gaCommandSet = (...args) => {
    if (typeof args[0] === 'string') {
      args[0] = { [args[0]]: args[1] };
    }
    this._gtag('set', this._toGtagOptions(args[0]));
  };

  _gaCommand = (command, ...args) => {
    switch (command) {
      case 'send':
        this._gaCommandSend(...args);
        break;
      case 'set':
        this._gaCommandSet(...args);
        break;
      default:
        console.warn(`Command doesn't exist: ${command}`);
    }
  };

  ga = (...args) => {
    if (typeof args[0] === 'string') {
      this._gaCommand(...args);
    } else {
      const [readyCallback] = args;
      this._gtag(
        'get',
        this._current_GA_MEASUREMENT_ID,
        'client_id',
        (clientId) => {
          this._isQueuing = false;
          const queues = this._queueGtag;

          readyCallback({
            get: (property) =>
              property === 'clientId'
                ? clientId
                : property === 'trackingId'
                ? this._current_GA_MEASUREMENT_ID
                : property === 'apiVersion'
                ? '1'
                : undefined,
          });

          while (queues.length) {
            const queue = queues.shift();
            this._gtag(...queue);
          }
        }
      );

      this._isQueuing = true;
    }

    return this.ga;
  };

  event = ({
    category,
    action,
    label,
    value,
    nonInteraction,
    transport,
    ...args
  } = {}) => {
    if (!category || !action) {
      console.warn('args.category AND args.action are required in event()');

      return;
    }

    // Required Fields
    const fieldObject = {
      hitType: 'event',
      eventCategory: format(category),
      eventAction: format(action),
    };

    // Optional Fields
    if (label) {
      fieldObject.eventLabel = format(label);
    }

    if (typeof value !== 'undefined') {
      if (typeof value !== 'number') {
        console.warn('Expected `args.value` arg to be a Number.');
      } else {
        fieldObject.eventValue = value;
      }
    }

    if (typeof nonInteraction !== 'undefined') {
      if (typeof nonInteraction !== 'boolean') {
        console.warn('`args.nonInteraction` must be a boolean.');
      } else {
        fieldObject.nonInteraction = nonInteraction;
      }
    }

    if (typeof transport !== 'undefined') {
      if (typeof transport !== 'string') {
        console.warn('`args.transport` must be a string.');
      } else {
        if (['beacon', 'xhr', 'image'].indexOf(transport) === -1) {
          console.warn(
            '`args.transport` must be either one of these values: `beacon`, `xhr` or `image`'
          );
        }

        fieldObject.transport = transport;
      }
    }

    Object.keys(args)
      .filter((key) => key.substr(0, 'dimension'.length) === 'dimension')
      .forEach((key) => {
        fieldObject[key] = args[key];
      });

    Object.keys(args)
      .filter((key) => key.substr(0, 'metric'.length) === 'metric')
      .forEach((key) => {
        fieldObject[key] = args[key];
      });

    this._gaCommand('send', fieldObject);
  };

  send = (fieldObject) => {
    return this._gaCommand('send', fieldObject);
  };

  _appendCustomMap(options) {
    if (!options.custom_map) {
      options.custom_map = {};
    }

    for (let i = 1; i <= 200; i++) {
      if (!options.custom_map[`dimension${i}`]) {
        options.custom_map[`dimension${i}`] = `dimension${i}`;
      }
      if (!options.custom_map[`metric${i}`]) {
        options.custom_map[`metric${i}`] = `metric${i}`;
      }
    }

    return options;
  }
}

export default new GA4();
