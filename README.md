# React Google Analytics 4

## Migrate from old react-ga

```js
// Simply replace `react-ga` with `react-ga4`
// import ReactGA from "react-ga";
import ReactGA from "react-ga4";
```

## Install

```bash
npm i react-ga4
```

## Usage

```js
import ReactGA from "react-ga4";

ReactGA.initialize("your GA measurement id");
ReactGA.send("pageview");
```

## Example

More example can be found in [test suite](src/ga4.test.js)

```js
// Send pageview with a custom path
ReactGA.send({ hitType: "pageview", page: "/my-path" });

// Send a custom event
ReactGA.event({
  category: "your category",
  action: "your action",
  label: "your label", // optional
  value: 99, // optional, must be a number
  nonInteraction: true, // optional, true/false
  transport: "xhr", // optional, beacon/xhr/image
});
```

## API

#### ReactGA.initialize(GA_MEASUREMENT_ID, options)

| Parameter           | Notes                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| GA_MEASUREMENT_ID   | `string` Required                                                                                                       |
| options.testMode    | `boolean` Default false                                                                                                 |
| options.gaOptions   | `object` Optional [Reference](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference) |
| options.gtagOptions | `object` Optional                                                                                                       |

#### ReactGA.set(fieldsObject)

| Parameter    | Notes             |
| ------------ | ----------------- |
| fieldsObject | `object` Required |

#### ReactGA.event(options)

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

#### ReactGA.send(fieldsObject)

| Parameter    | Notes             |
| ------------ | ----------------- |
| fieldsObject | `object` Required |

#### ReactGA&#46;ga(...args)

#### ~~ReactGA.pageview(path, \_, title)~~ Deprecated Use `.send("pageview")` instead

#### ~~ReactGA.outboundLink({ label }, hitCallback)~~ Deprecated

## Debugging

Use [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna?hl=en) to see logs

## Maintainer

[Han Lin Yap](https://github.com/codler)

## License

MIT
