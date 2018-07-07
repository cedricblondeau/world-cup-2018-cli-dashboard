import PropTypes from 'prop-types';
import React from 'react';

import { getFormattedShortCountryName } from '../../../format/format';

const getGroupContent = group => {
  const data = group.ordered_teams.reduce(
    (rankings, team) =>
      `${rankings}${getFormattedShortCountryName(
        team.country,
        team.fifa_code,
      )} ${team.points.toString()}\n`,
    '',
  );
  return data;
};

const GroupDetails = props => (
  <element top={0} left={props.left} width={props.width} height={6}>
    <box
      content={`{bold}Group ${props.group.letter}{/bold}`}
      tags
      height={1}
      align="center"
    />
    <box
      top={2}
      content={getGroupContent(props.group)}
      left="center"
      height={4}
    />
  </element>
);

GroupDetails.propTypes = {
  left: PropTypes.number.isRequired,
  group: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
};

export default GroupDetails;
