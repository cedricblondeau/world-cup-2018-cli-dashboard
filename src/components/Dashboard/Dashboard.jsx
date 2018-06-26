import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from '../../config';
import FixtureAPI from '../../api/fixtures';
import GroupList from '../GroupList/GroupList';
import MatchDetails from '../MatchDetails/MatchDetails';
import MatchNav from '../MatchNav/MatchNav';
import ProdAPI from '../../api/prod';

const getAPIWrapper = () => {
  if (config.shouldUseFixtures) {
    return FixtureAPI;
  }
  return ProdAPI;
};

const getNextMatches = matches =>
  matches.filter(match => match.status === 'future');

const getCurrentOrPastMatches = matches =>
  matches
    .filter(
      match => match.status === 'completed' || match.status === 'in progress',
    )
    .reverse();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPastOrCompletedMatchIndex: 0,
      groups: null,
      matches: null,
    };
  }

  componentDidMount() {
    this.updateGroups();
    this.updateMatches();
    setInterval(() => this.updateMatches(), 30 * 1000);
    setInterval(() => this.updateGroups(), 2 * 60 * 1000);
    this.addKeyPressListeners();
  }

  get matchDetails() {
    if (!this.state.matches) {
      return <box content="Fetching data..." />;
    }

    const matchToDisplay = getCurrentOrPastMatches(this.state.matches)[
      this.state.selectedPastOrCompletedMatchIndex
    ];
    if (!matchToDisplay) {
      return <box content="No match?" />;
    }

    return <MatchDetails match={matchToDisplay} />;
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

    return (
      <MatchNav
        currentOrLastMatches={getCurrentOrPastMatches(this.state.matches)}
        selectedPastOrCompletedMatchIndex={
          this.state.selectedPastOrCompletedMatchIndex
        }
        nextMatches={getNextMatches(this.state.matches)}
      />
    );
  }

  addKeyPressListeners() {
    this.props.addKeypressListener('left', () => {
      if (this.state.selectedPastOrCompletedMatchIndex <= 0) {
        return;
      }

      this.setState(prevState => ({
        selectedPastOrCompletedMatchIndex:
          prevState.selectedPastOrCompletedMatchIndex - 1,
      }));
    });

    this.props.addKeypressListener('right', () => {
      const navMatchesCount = getCurrentOrPastMatches(this.state.matches)
        .length;
      if (this.state.selectedPastOrCompletedMatchIndex >= navMatchesCount - 1) {
        return;
      }

      this.setState(prevState => ({
        selectedPastOrCompletedMatchIndex:
          prevState.selectedPastOrCompletedMatchIndex + 1,
      }));
    });
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
  addKeypressListener: PropTypes.func.isRequired,
  debug: PropTypes.func.isRequired,
};

export default Dashboard;
