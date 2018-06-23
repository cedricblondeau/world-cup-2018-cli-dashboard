import React from 'react';
import PropTypes from 'prop-types';

import { getShortFormattedMatch, getFormattedDatetime } from '../../../format';

const MatchNavItem = props => (
  <element left={props.left} top={0} height={2} width={props.width}>
    <box
      content={getFormattedDatetime(props.match)}
      top={0}
      align="center"
      width="100%"
    />
    <box
      content={getShortFormattedMatch(props.match)}
      top={1}
      align="center"
      width="100%"
    />
  </element>
);

MatchNavItem.propTypes = {
  left: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
};

export default MatchNavItem;
