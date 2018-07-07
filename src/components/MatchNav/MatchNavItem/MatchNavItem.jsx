import chalk from 'chalk';
import React from 'react';
import PropTypes from 'prop-types';

import {
  getShortFormattedMatch,
  getFormattedDatetime,
  getShortStageName,
} from '../../../format/format';

const selectedStyle = {
  bg: 'red',
  fg: 'white',
};

const nonSelectedStyle = {
  bg: 'black',
  fg: 'white',
};

const MatchNavItem = props => (
  <element left={props.left} top={0} height={2} width={props.width}>
    <box
      content={getFormattedDatetime(props.match, true)}
      top={0}
      align="center"
      width="100%"
      style={props.isSelected ? selectedStyle : nonSelectedStyle}
    />
    <box
      content={`${getShortFormattedMatch(props.match)} ${chalk.black.bgWhite(
        getShortStageName(props.match),
      )}`}
      tags
      top={1}
      align="center"
      width="100%"
      style={props.isSelected ? selectedStyle : nonSelectedStyle}
    />
  </element>
);

MatchNavItem.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  left: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
};

export default MatchNavItem;
