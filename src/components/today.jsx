import axios from 'axios';
import React, { Component } from 'react';

import {
  getFormattedCompletedMatch,
  getFormattedNonCompletedMatch,
} from '../format';

const getTodayMatches = async () => {
  try {
    const response = await axios.get('http://worldcup.sfg.io/matches/today');
    return response.data;
  } catch (e) {
    return null;
  }
};

class TodayMatches extends Component {
  constructor(props) {
    super(props);

    this.state = { matches: [], isLoading: true };

    this.updateTodayMatches();
    setInterval(() => this.updateTodayMatches(), 120 * 1000);
  }

  get todayMatchesContent() {
    if (this.state.isLoading) {
      return 'Fetching...';
    }

    const nonCompletedMatchesContent = this.state.matches.reduce(
      (content, match) => {
        if (match.status === 'completed') {
          return content;
        }

        return `${content}${getFormattedNonCompletedMatch(match)}\n`;
      },
      "{bold}Today's non-completed matches:{/bold}\n",
    );

    const completedMatchesContent = this.state.matches.reduce(
      (content, match) => {
        if (match.status !== 'completed') {
          return content;
        }

        return `${content}${getFormattedCompletedMatch(match)}\n`;
      },
      "\n\n{bold}Today's completed matches:{/bold}\n",
    );

    return `${nonCompletedMatchesContent}${completedMatchesContent}`;
  }

  async updateTodayMatches() {
    const matches = await getTodayMatches();
    this.setState({ matches, isLoading: false });
  }

  render() {
    return (
      <box
        content={this.todayMatchesContent}
        tags
        padding={1}
        width="50%"
        height="50%"
        top="50%"
        left="0"
        border={{ type: 'line' }}
      />
    );
  }
}

export default TodayMatches;
