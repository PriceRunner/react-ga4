# React Google Analytics 4

## Migrate from old react-ga

```js
// Simply replace `react-ga` with `react-ga4`
import ReactGA from "react-ga";
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

## Maintainer

[Han Lin Yap](https://github.com/codler)

## License

MIT
