import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  getFormattedCompletedMatch,
  getFormattedNonCompletedMatch,
} from '../format';

class TodayMatches extends Component {
  constructor(props) {
    super(props);

    this.state = { matches: [], isLoading: true };
  }

  componentDidMount() {
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
    try {
      const response = await axios.get('http://worldcup.sfg.io/matches/today');
      if (!Array.isArray(response.data)) {
        this.props.debug(
          `TodayMatches - Received unexpected data: ${response.data}`,
        );
        return;
      }

      this.setState({ matches: response.data, isLoading: false });
    } catch (e) {
      this.props.debug(`TodayMatches - ${e.message}`);
    }
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

TodayMatches.propTypes = {
  debug: PropTypes.func.isRequired,
};

export default TodayMatches;
