import React from 'react';
import PropTypes from 'prop-types';

import CurrentMatch from './components/current';
import Groups from './components/groups';
import Matches from './components/matches';

const Dashboard = props => (
  <element>
    <CurrentMatch debug={props.debug} />
    <Groups debug={props.debug} />
    <Matches debug={props.debug} />
  </element>
);

Dashboard.propTypes = { debug: PropTypes.func.isRequired };

export default Dashboard;
