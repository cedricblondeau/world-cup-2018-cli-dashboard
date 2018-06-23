import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FixtureAPI from '../../api/fixtures';
import GroupList from '../GroupList/GroupList';
import MatchDetails from '../MatchDetails/MatchDetails';
import MatchNav from '../MatchNav/MatchNav';
import ProdAPI from '../../api/prod';

const getAPIWrapper = () => {
  const shouldUseFixtures = process.env.USE_FIXTURES;
  if (shouldUseFixtures) {
    return FixtureAPI;
  }
  return ProdAPI;
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { groups: null, matches: null };
  }

  componentDidMount() {
    this.updateGroups();
    this.updateMatches();
    setInterval(() => this.updateMatches(), 1 * 30 * 1000);
  }

  get currentOrLastMatch() {
    const currentMatch = this.state.matches.find(
      match => match.status === 'in progress',
    );
    if (currentMatch) {
      return currentMatch;
    }

    return this.state.matches
      .filter(match => match.status === 'completed')
      .reverse()[0];
  }

  get matchDetails() {
    if (!this.state.matches) {
      return <box content="Fetching data..." />;
    }

    const { currentOrLastMatch } = this;
    if (!currentOrLastMatch) {
      return <box content="No match?" />;
    }

    return <MatchDetails match={this.currentOrLastMatch} />;
  }

  get groups() {
    if (!this.state.groups) {
      return <box content="Fetching data..." />;
    }
    return <GroupList groups={this.state.groups} />;
  }

  get matchNav() {
    if (!this.state.matches) {
      return <box content="Fetching data..." />;
    }

    return <MatchNav matches={this.state.matches} />;
  }

  async updateGroups() {
    try {
      const groups = await getAPIWrapper().getGroups();
      if (!Array.isArray(groups)) {
        this.props.debug(`Groups - Received unexpected data: ${groups}`);
        return;
      }

      this.setState({ groups });
    } catch (e) {
      this.props.debug(`Groups - ${e.message}`);
    }
  }

  async updateMatches() {
    try {
      const matches = await getAPIWrapper().getMatches();
      if (!Array.isArray(matches)) {
        this.props.debug(`Matches - Received unexpected data: ${matches}`);
        return;
      }

      this.setState({ matches });
    } catch (e) {
      this.props.debug(`Matches - ${e.message}`);
    }
  }

  render() {
    const matchNavHeight = 5;
    return (
      <element>
        <element height={matchNavHeight} top={1}>
          {this.matchNav}
        </element>
        <line
          top={matchNavHeight + 2}
          height={1}
          orientation="horizontal"
          type="line"
          width="100%"
        />
        <element height="100%-15" top={matchNavHeight + 3}>
          {this.matchDetails}
        </element>
        <line
          top="100%-8"
          height={1}
          orientation="horizontal"
          type="line"
          width="100%"
        />
        <element top="100%-7">{this.groups}</element>
      </element>
    );
  }
}

Dashboard.propTypes = {
  debug: PropTypes.func.isRequired,
};

export default Dashboard;
