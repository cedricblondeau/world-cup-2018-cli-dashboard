import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MatchesTable from './matchestable';

class Matches extends Component {
  constructor(props) {
    super(props);

    this.state = { matches: [] };
  }

  componentDidMount() {
    this.updateMatches();
    setInterval(() => this.updateMatches(), 5 * 60 * 1000);
  }

  get nextMatches() {
    return this.state.matches.filter(match => match.status === 'future');
  }

  get lastMatches() {
    const matches = this.state.matches
      .filter(match => match.status === 'completed')
      .reverse();
    return matches;
  }

  async updateMatches() {
    try {
      const response = await axios.get('http://worldcup.sfg.io/matches');
      if (!Array.isArray(response.data)) {
        this.props.debug(
          `Matches - Received unexpected data: ${response.data}`,
        );
        return;
      }

      this.setState({ matches: response.data });
    } catch (e) {
      this.props.debug(`Matches - ${e.message}`);
    }
  }

  render() {
    return (
      <element width="55%" height="50%" top="50%" left="0">
        <MatchesTable
          top="0%"
          title="Last matches"
          matches={this.lastMatches}
        />
        <MatchesTable
          top="50%"
          title="Next matches"
          matches={this.nextMatches}
        />
      </element>
    );
  }
}

Matches.propTypes = {
  debug: PropTypes.func.isRequired,
};

export default Matches;
