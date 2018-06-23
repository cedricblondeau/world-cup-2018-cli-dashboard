import React from 'react';
import PropTypes from 'prop-types';

import MatchNavItem from './MatchNavItem/MatchNavItem';

const getNextMatches = matches =>
  matches.filter(match => match.status === 'future');

const getLastMatches = matches =>
  matches.filter(match => match.status === 'completed').reverse();

const getMatchNavItems = matches =>
  matches.map((match, i) => (
    <MatchNavItem left={i * 23} width={23} match={match} />
  ));

const MatchNav = props => (
  <element height={5}>
    <box top={0} height={2} scrollable>
      {getMatchNavItems(getLastMatches(props.matches))}
    </box>
    <box top={3} height={2} scrollable>
      {getMatchNavItems(getNextMatches(props.matches))}
    </box>
  </element>
);

MatchNav.propTypes = { matches: PropTypes.array.isRequired };

export default MatchNav;
