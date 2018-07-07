import PropTypes from 'prop-types';
import React from 'react';

import {
  getFormattedMatchEventLeft,
  getFormattedMatchEventRight,
} from '../../../format/format';

const getEventsContent = (events, align) =>
  events.reduce((content, event) => {
    if (align === 'right') {
      return `${content}${getFormattedMatchEventRight(event)}\n`;
    }
    return `${content}${getFormattedMatchEventLeft(event)}\n`;
  }, '');

const MatchEvents = props => (
  <box
    content={getEventsContent(props.events, props.align)}
    align={props.align}
  />
);

MatchEvents.propTypes = {
  align: PropTypes.oneOf(['left', 'right']).isRequired,
  events: PropTypes.array.isRequired,
};

export default MatchEvents;
