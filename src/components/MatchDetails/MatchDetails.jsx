import React from 'react';
import PropTypes from 'prop-types';

import { getFormattedDatetime } from '../../format/format';
import MatchTeamScoreboard from './MatchTeamScoreboard/MatchTeamScoreboard';

const MatchDetails = props => (
  <element>
    <element width="100%" top={1}>
      <box content={props.match.location} width="33.33%" left={0} />
      <box
        content={props.match.time}
        align="center"
        width="33.33%"
        left="33.33%"
      />
      <box
        content={getFormattedDatetime(props.match)}
        align="right"
        width="33.33%"
        left="66.66%"
      />
    </element>
    <element width="100%" top={2}>
      <box left={0} width="50%-5" height="100%" align="right">
        <MatchTeamScoreboard
          events={props.match.home_team_events}
          goals={props.match.home_team.goals}
          country={props.match.home_team.country}
          align="right"
        />
      </box>
      <box left="50%+5" width="50%-5" height="100%">
        <MatchTeamScoreboard
          events={props.match.away_team_events}
          goals={props.match.away_team.goals}
          country={props.match.away_team.country}
          align="left"
        />
      </box>
    </element>
  </element>
);

MatchDetails.propTypes = { match: PropTypes.object.isRequired };

export default MatchDetails;
