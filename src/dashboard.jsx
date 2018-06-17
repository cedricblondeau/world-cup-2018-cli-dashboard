import React from 'react';

import CurrentMatch from './components/current';
import Groups from './components/groups';
import TodayMatches from './components/today';

const Dashboard = () => (
  <element>
    <CurrentMatch />
    <TodayMatches />
    <Groups />
  </element>
);

export default Dashboard;
