import React from 'react';
import PropTypes from 'prop-types';

import MatchNavItem from './MatchNavItem/MatchNavItem';

const getMatchNavItems = (matches, selectedMatchIndex = null) =>
  matches.map((match, i) => (
    <MatchNavItem
      isSelected={selectedMatchIndex === i}
      key={`match-nav-item-{${match.fifa_id}}`}
      left={i * 23}
      width={23}
      match={match}
    />
  ));

const MatchNav = props => (
  <element height={5}>
    <box top={0} height={2} scrollable>
      {getMatchNavItems(
        props.currentAndLastMatches,
        props.selectedNonCompletedMatchIndex,
      )}
    </box>
    <box top={3} height={2} scrollable>
      {getMatchNavItems(props.nextMatches)}
    </box>
  </element>
);

MatchNav.propTypes = {
  currentAndLastMatches: PropTypes.array.isRequired,
  nextMatches: PropTypes.array.isRequired,
  selectedNonCompletedMatchIndex: PropTypes.number.isRequired,
};

export default MatchNav;
