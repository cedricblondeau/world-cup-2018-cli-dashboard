import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

import config from './config';
import Dashboard from './components/Dashboard/Dashboard';

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'World Cup 2018 CLI Dashboard',
  debug: true,
  fullUnicode: config.shouldIncludeEmojis,
});

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

render(
  <Dashboard
    debug={msg => screen.debug(msg)}
    addKeypressListener={(key, fn) => screen.key(key, fn)}
  />,
  screen,
);
