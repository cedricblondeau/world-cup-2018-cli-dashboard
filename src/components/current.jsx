import axios from 'axios';
import React, { Component } from 'react';

import { getFormattedNonCompletedMatch, getFormattedScore } from '../format';

const getCurrentMatch = async () => {
  let matches;
  try {
    matches = await axios.get('http://worldcup.sfg.io/matches/current');
  } catch (e) {
    return null;
  }

  if (!matches.data[0]) {
    return null;
  }

  return matches.data[0];
};

class CurrentMatch extends Component {
  constructor(props) {
    super(props);

    this.state = { currentMatch: null, isLoading: true };

    this.updateCurrentMatch();
    setInterval(() => this.updateCurrentMatch(), 30 * 1000);
  }

  get currentMatchLabel() {
    if (this.state.isLoading) {
      return 'Fetching...';
    }

    if (!this.state.currentMatch) {
      return 'There are currently no matches';
    }

    return `Current match: ${getFormattedNonCompletedMatch(
      this.state.currentMatch,
    )}`;
  }

  get currentMatchScore() {
    if (this.state.isLoading) {
      return 'Fetching...';
    }

    if (!this.state.currentMatch) {
      return 'N/A';
    }

    return getFormattedScore(this.state.currentMatch);
  }

  async updateCurrentMatch() {
    const currentMatch = await getCurrentMatch();
    this.setState({ currentMatch, isLoading: false });
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

export default CurrentMatch;
