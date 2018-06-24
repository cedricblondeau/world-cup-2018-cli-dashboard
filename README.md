![screenshot](https://raw.githubusercontent.com/cedricblondeau/world-cup-2018-cli-dashboard/master/screenshot.gif)

# World Cup 2018 CLI Dashboard [![Build Status](https://travis-ci.org/cedricblondeau/world-cup-2018-cli-dashboard.svg?branch=master)](https://travis-ci.org/cedricblondeau/world-cup-2018-cli-dashboard)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/kinda-sfw.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)

## Install

**Using `docker` 🐳**:

```bash
docker run -ti -e TZ=America/Toronto -e WITH_EMOJIS=1 cedricbl/world-cup-2018-cli-dashboard
```

Replace `America/Toronto` with you actual timezone. Set `WITH_EMOJIS` to `0` to disable emojis.

**Using `yarn`**:

```bash
yarn global add world-cup-cli-dashboard
```

Requires NodeJS 6+.

**Or using `npm`**:

```bash
npm install -g world-cup-cli-dashboard
```

Requires NodeJS 6+.

## Usage

```bash
wc2018
```

With emojis:

```bash
WITH_EMOJIS=1 wc2018
```

Use ⬅️  and ➡️  keys to navigate through different different matches.

## How does it work?

Data is sourced from the awesome [worldcup.sfg.io](http://worldcup.sfg.io/). Matches get updated each 30 seconds.

Terminal interface built with [react-blessed](https://github.com/Yomguithereal/react-blessed).

## FAQ

#### Q: Emojis are not rendering correctly and/or the layout looks broken, what I can do?

Some terminal configurations may not be able to render flag emojis and emojis can cause alignment issues. This is a known problem.

For now, if you can live without emojis (I cannot), you can use `WITH_EMOJIS=0`.

#### Q: Data is not showing up?

If an API call fail, we log a debug message. Press `F12` to see the debug console, some helpful messages may show up (a 429 HTTP code for instance).

## Development

```bash
git clone https://github.com/cedricblondeau/world-cup-2018-cli-dashboard
cd world-cup-2018-cli-dashboard
yarn install
WITH_EMOJIS=1 USE_FIXTURES=1 yarn start
```

Set `USE_FIXTURES` to `0` to use the actual API in dev and `WITH_EMOJIS` to disable emojis.

Contributions are very welcome.

## LICENSE

MIT
