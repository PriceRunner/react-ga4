/**
 * @typedef GaOptions
 * @type {Object}
 * @property {boolean} [cookieUpdate=true]
 * @property {number} [cookieExpires=63072000] Default two years
 * @property {string} [cookieDomain="auto"]
 * @property {string} [cookieFlags]
 * @property {string} [userId]
 * @property {string} [clientId]
 * @property {boolean} [anonymizeIp]
 * @property {string} [contentGroup1]
 * @property {string} [contentGroup2]
 * @property {string} [contentGroup3]
 * @property {string} [contentGroup4]
 * @property {string} [contentGroup5]
 * @property {boolean} [allowAdFeatures=true]
 * @property {boolean} [allowAdPersonalizationSignals]
 * @property {boolean} [nonInteraction]
 * @property {string} [page]
 */
export class GA4 {
    reset: () => void;
    isInitialized: boolean;
    _testMode: boolean;
    _hasLoadedGA: boolean;
    _isQueuing: boolean;
    _queueGtag: any[];
    _gtag: (...args: any[]) => void;
    _loadGA: (GA_MEASUREMENT_ID: any) => void;
    _toGtagOptions: (gaOptions: any) => {};
    /**
     *
     * @param {string} GA_MEASUREMENT_ID
     * @param {Object} [options]
     * @param {boolean} [options.testMode=false]
     * @param {GaOptions|any} [options.gaOptions]
     * @param {Object} [options.gtagOptions] New parameter
     */
    initialize: (GA_MEASUREMENT_ID: string, options?: {
        testMode?: boolean;
        gaOptions?: GaOptions | any;
        gtagOptions?: any;
    }) => void;
    _current_GA_MEASUREMENT_ID: string;
    set: (fieldsObject: any) => void;
    _gaCommandSendEvent: (eventCategory: any, eventAction: any, eventLabel: any, eventValue: any, fieldsObject: any) => void;
    _gaCommandSendEventParameters: (...args: any[]) => void;
    _gaCommandSendTiming: (timingCategory: any, timingVar: any, timingValue: any, timingLabel: any) => void;
    _gaCommandSendPageview: (pageTitle: any, pageLocation: any, pagePath: any) => void;
    _gaCommandSend: (...args: any[]) => void;
    _gaCommandSet: (...args: any[]) => void;
    _gaCommand: (command: any, ...args: any[]) => void;
    ga: (...args: any[]) => any;
    event: ({ category, action, label, value, nonInteraction, transport, ...args }?: {
        category: any;
        action: any;
        label?: any;
        value?: any;
        nonInteraction?: any;
        transport?: any;
    }) => void;
    send: (fieldObject: any) => void;
    _appendCustomMap(options: any): any;
    /**
     * @since v1.0.2
     * @param {string} [path="location.href"]
     * @param {string[]} [_] unsupported
     * @param {string} [title="location.pathname"]
     */
    pageview: (path?: string, _?: string[], title?: string) => void;
}
declare var _default: GA4;
export default _default;
export type GaOptions = {
    cookieUpdate?: boolean;
    /**
     * Default two years
     */
    cookieExpires?: number;
    cookieDomain?: string;
    cookieFlags?: string;
    userId?: string;
    clientId?: string;
    anonymizeIp?: boolean;
    contentGroup1?: string;
    contentGroup2?: string;
    contentGroup3?: string;
    contentGroup4?: string;
    contentGroup5?: string;
    allowAdFeatures?: boolean;
    allowAdPersonalizationSignals?: boolean;
    nonInteraction?: boolean;
    page?: string;
};
