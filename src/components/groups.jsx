import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Group from './group';

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = { groups: null };
  }

  componentDidMount() {
    this.updateGroups();
  }

  get groups() {
    if (!this.state.groups) {
      return 'Fetching...';
    }

    return this.state.groups.map((group, i) => {
      const x = i % 2;
      const y = Math.floor(i / 2);

      return (
        <Group
          key={`group-${group.group.id}`}
          group={group.group}
          left={`${x * 50}%`}
          top={`${y * 25}%`}
        />
      );
    });
  }

  async updateGroups() {
    try {
      const response = await axios.get(
        'http://worldcup.sfg.io/teams/group_results',
      );
      if (!Array.isArray(response.data)) {
        this.props.debug(`Groups - Received unexpected data: ${response.data}`);
        return;
      }

      this.setState({ groups: response.data });
    } catch (e) {
      this.props.debug(`Groups - ${e.message}`);
    }
  }

  render() {
    return (
      <element width="50%" height="100%" top="0" left="50%" border="line">
        <element left={4} top={1}>
          {this.groups}
        </element>
      </element>
    );
  }
}

Groups.propTypes = {
  debug: PropTypes.func.isRequired,
};

export default Groups;
