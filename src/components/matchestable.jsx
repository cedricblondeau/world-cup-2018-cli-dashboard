import PropTypes from 'prop-types';
import React from 'react';

import { getFormattedMatch, getFormattedDatetime } from '../format';

function getMatches(matches) {
  return matches.reduce((data, match) => {
    data.push([getFormattedDatetime(match), getFormattedMatch(match)]);
    return data;
  }, []);
}

const MatchesTable = props => (
  <element
    left={0}
    top={props.top}
    width="100%"
    height="50%"
    scrollable
    border="line"
  >
    <box
      content={`{bold}${props.title}{/bold}`}
      tags
      height={1}
      align="center"
    />
    <listtable
      top={2}
      left="center"
      data={getMatches(props.matches)}
      width="90%"
      height={8}
      align="left"
    />
  </element>
);

MatchesTable.propTypes = {
  top: PropTypes.string.isRequired,
  matches: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default MatchesTable;
