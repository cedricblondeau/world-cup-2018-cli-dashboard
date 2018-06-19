import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormattedNonCompletedMatch, getFormattedScore } from '../format';

class CurrentMatch extends Component {
  constructor(props) {
    super(props);

    this.state = { currentMatches: null, isLoading: true };

    this.updateCurrentMatch();
    setInterval(() => this.updateCurrentMatch(), 30 * 1000);
  }

  get currentMatchLabel() {
    if (this.state.isLoading) {
      return 'Fetching...';
    }

    if (this.state.currentMatches.length === 0) {
      return 'There are currently no matches';
    }

    const firstMatch = this.state.currentMatches[0];
    return `Current match: ${getFormattedNonCompletedMatch(firstMatch)}`;
  }

  get currentMatchScore() {
    if (this.state.isLoading) {
      return 'Fetching...';
    }

    if (this.state.currentMatches.length === 0) {
      return 'N/A';
    }

    const firstMatch = this.state.currentMatches[0];
    return getFormattedScore(firstMatch);
  }

  async updateCurrentMatch() {
    try {
      const response = await axios.get(
        'http://worldcup.sfg.io/matches/current',
      );
      if (!Array.isArray(response.data)) {
        this.props.debug(
          `CurrentMatch - Received unexpected data: ${response.data}`,
        );
        return;
      }

      this.setState({ currentMatches: response.data, isLoading: false });
    } catch (e) {
      this.props.debug(`CurrentMatch: ${e.message}`);
    }
  }

  render() {
    return (
      <box width="50%" height="50%" border={{ type: 'line' }}>
        <box
          content={this.currentMatchLabel}
          tags
          width="80%"
          height="20%"
          top="0"
          left="0"
          align="left"
          valign="middle"
        />
        <bigtext
          shrink
          width="80%"
          height="70%"
          left="0"
          top="20%"
          content={this.currentMatchScore}
          ch=" "
          fch={'\u2592'}
          style={{
            fg: 'red',
            bold: false,
          }}
        />
      </box>
    );
  }
}

CurrentMatch.propTypes = {
  debug: PropTypes.func.isRequired,
};

export default CurrentMatch;
