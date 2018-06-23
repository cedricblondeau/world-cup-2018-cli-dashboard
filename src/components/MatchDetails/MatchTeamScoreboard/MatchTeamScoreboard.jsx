import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getFormattedCountry } from '../../../format';
import MatchEvents from '../MatchEvents/MatchEvents';

class MatchTeamScoreboard extends Component {
  get goalsLeftPosition() {
    const leftAlignLeftPosition = 4;
    if (this.props.align === 'right') {
      return '100%-13';
    }
    return leftAlignLeftPosition;
  }

  render() {
    return (
      <element>
        <box height={17}>
          <box
            content={getFormattedCountry(this.props.country)}
            height={1}
            width="100%"
            align="center"
            top="center"
          />
          <bigtext
            width={15}
            content={this.props.goals.toString()}
            ch=" "
            fch={'\u2592'}
            style={{
              fg: 'red',
              bold: false,
            }}
            left={this.goalsLeftPosition}
          />
        </box>
        <box top={17} height="100%-18">
          <MatchEvents events={this.props.events} align={this.props.align} />
        </box>
      </element>
    );
  }
}

MatchTeamScoreboard.propTypes = {
  align: PropTypes.oneOf(['left', 'right']).isRequired,
  country: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  goals: PropTypes.number.isRequired,
};

export default MatchTeamScoreboard;
