import PropTypes from 'prop-types';
import React from 'react';

import { getFormattedShortCountryName } from '../format';

const getTableDataForGroup = group => {
  const data = group.teams.reduce((rankings, team) => {
    rankings.push([
      getFormattedShortCountryName(team.team.country, team.team.fifa_code),
      team.team.points.toString(),
    ]);
    return rankings;
  }, []);
  return data;
};

const Group = props => (
  <element top={props.top} left={props.left} width="50%" height="25%">
    <box
      content={`{bold}Group ${props.group.letter}{/bold}`}
      tags
      height={1}
      align="center"
    />
    <listtable
      top={2}
      data={getTableDataForGroup(props.group)}
      width="90%"
      height={6}
    />
  </element>
);

Group.propTypes = {
  top: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  group: PropTypes.shape({
    letter: PropTypes.string,
    teams: PropTypes.arrayOf(
      PropTypes.shape({
        team: PropTypes.shape({
          country: PropTypes.string,
          fifa_code: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
};

export default Group;
