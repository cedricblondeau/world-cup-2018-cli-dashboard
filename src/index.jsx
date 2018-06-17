import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

import Dashboard from './dashboard';

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'World Cup 2018 CLI Dashboard',
  debug: true,
  fullUnicode: true,
});
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

render(<Dashboard />, screen);
