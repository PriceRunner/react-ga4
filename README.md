# React Google Analytics 4

## Migrate from old react-ga

```js
// Simply replace `react-ga` with `react-ga4`
// import ReactGA from "react-ga";
import ReactGa from "react-ga4";
```

## Install

```bash
npm i react-ga4
```

## Usage

```js
import ReactGa from "react-ga4";

ReactGa.initialize("your GA measurement id");
ReactGa.send("pageview");
```

## Example

More example can be found in [test suite](src/ga4.test.js)

```js
// Multiple products (previously known as trackers)
ReactGa.initialize([
  {
    trackingId: "your GA measurement id",
    gaOptions: {...}, // optional
    gtagOptions: {...}, // optional
  },
  {
    trackingId: "your second GA measurement id",
  },
]);

// Send pageview with a custom path
ReactGa.send({ hitType: "pageview", page: "/my-path" });

// Send a custom event
ReactGa.event({
  category: "your category",
  action: "your action",
  label: "your label", // optional
  value: 99, // optional, must be a number
  nonInteraction: true, // optional, true/false
  transport: "xhr", // optional, beacon/xhr/image
});
```

## Reference

#### ReactGa.initialize(GA_MEASUREMENT_ID, options)

| Parameter                     | Notes                                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| GA_MEASUREMENT_ID             | `string` Required                                                                                                       |
| options.nonce                 | `string` Optional Used for Content Security Policy (CSP) [more](https://developers.google.com/tag-manager/web/csp)      |
| options.testMode              | `boolean` Default false                                                                                                 |
| options.gaOptions             | `object` Optional [Reference](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference) |
| options.gtagOptions           | `object` Optional                                                                                                       |
| options.legacyDimensionMetric | `boolean` Default true                                                                                                  |

#### ReactGa.set(fieldsObject)

| Parameter    | Notes             |
| ------------ | ----------------- |
| fieldsObject | `object` Required |

#### ReactGa.event(name, params)

This method signature are NOT for `UA-XXX`

| Parameter | Notes                                                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| name      | `string` Required A [recommended event](https://developers.google.com/tag-platform/gtagjs/reference/events) or a custom event |
| params    | `object` Optional                                                                                                             |

#### ReactGa.event(options)

| Parameter                    | Notes                               |
| ---------------------------- | ----------------------------------- |
| options                      | `object` Required                   |
| options.action               | `string` Required                   |
| options.category             | `string` Required                   |
| options.label                | `string` Optional                   |
| options.value                | `number` Optional                   |
| options.nonInteraction       | `boolean` Optional                  |
| options.transport            | `'beacon'\|'xhr'\|'image'` Optional |
| options.dimension`{1...200}` | `any` Optional                      |
| options.metric`{1...200}`    | `any` Optional                      |

#### ReactGa.send(fieldsObject)

| Parameter    | Notes             |
| ------------ | ----------------- |
| fieldsObject | `object` Required |

#### ReactGa&#46;gtag(...args)

#### ReactGa&#46;ga(...args)

#### ~~ReactGa.pageview(path, \_, title)~~

Deprecated Use `.send("pageview")` instead

#### ~~ReactGa.outboundLink({ label }, hitCallback)~~

Deprecated Use `enhanced measurement` feature in Google Analytics.

### Extending

```js
import { ReactGAImplementation } from "react-ga4";

class MyCustomOverriddenClass extends ReactGAImplementation {}

export default new MyCustomOverriddenClass();
```

## Debugging

Use [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna?hl=en) to see logs

## Maintainer

[Han Lin Yap](https://github.com/codler)

## License

MIT
