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
  transport: "xhr" // optional, beacon/xhr/image
});
```

## Maintainer

[Han Lin Yap](https://github.com/codler)

## License

MIT
