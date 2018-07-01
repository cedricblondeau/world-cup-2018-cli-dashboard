import chalk from 'chalk';
import { flag } from 'country-emoji';

import config from './config';
import moment from './moment';

function getCountryFlagEmoji(countryName) {
  if (!config.shouldIncludeEmojis) {
    return '';
  }

  const countryCodes = new Map([
    ['Korea Republic', 'KR'],
    ['England', 'GB'], // Emoji 5?
  ]);

  let flagEmoji;
  if (countryCodes.has(countryName)) {
    flagEmoji = flag(countryCodes.get(countryName));
  } else {
    flagEmoji = flag(countryName);
  }
  if (!flagEmoji) {
    return '🤷';
  }

  return flagEmoji;
}

function getFormattedCountry(countryName) {
  return `${getCountryFlagEmoji(countryName)}  ${countryName}`;
}

function getFormattedShortCountryName(countryName, fifaCode) {
  return `${getCountryFlagEmoji(countryName)}  ${fifaCode}`;
}

function getFormattedScore(match) {
  return `${match.home_team.goals}-${match.away_team.goals}`;
}

function getFormattedNonCompletedMatch(match) {
  return `${getFormattedCountry(
    match.home_team.country,
  )} - ${getFormattedCountry(match.away_team.country)}`;
}

function getFormattedCompletedMatch(match) {
  return `${getFormattedCountry(match.home_team.country)} ${
    match.home_team.goals
  } - ${match.away_team.goals} ${getFormattedCountry(match.away_team.country)}`;
}

function getShortFormattedNonCompletedMatch(match) {
  return `${match.home_team.code} - ${match.away_team.code}`;
}

function getFormattedTeamCodeForCompletedMatch(teamCode, winnerCode) {
  if (winnerCode && winnerCode === teamCode) {
    return `{bold}${teamCode}{/bold}`;
  }
  return teamCode;
}

function getShortFormattedCompletedMatch(match) {
  return `${getFormattedTeamCodeForCompletedMatch(
    match.home_team.code,
    match.winner_code,
  )} ${getFormattedScore(match)} ${getFormattedTeamCodeForCompletedMatch(
    match.away_team.code,
    match.winner_code,
  )}`;
}

function getShortFormattedMatch(match) {
  if (match.status === 'completed') {
    return getShortFormattedCompletedMatch(match);
  }
  return getShortFormattedNonCompletedMatch(match);
}

function getFormattedMatch(match) {
  if (match.status === 'completed') {
    return getFormattedCompletedMatch(match);
  }
  return getFormattedNonCompletedMatch(match);
}

function getFormattedDatetime(match, displayMinuteIfLive = false) {
  if (displayMinuteIfLive && match.status === 'in progress') {
    return `LIVE ${match.time}`;
  }

  return moment(match.datetime)
    .local()
    .calendar();
}

function getEventTypeFriendlyName(eventType) {
  const eventFriendlyNames = new Map([
    ['yellow-card', chalk.yellow('■')],
    ['yellow-card-second', chalk.yellow('■')],
    ['red-card', chalk.red('■')],
    ['goal', chalk.black.bgWhite('Goal')],
    ['substitution-in', '►'],
    ['substitution-out', '◄'],
    ['penalty-kick', chalk.black.bgWhite('Penalty kick')],
    ['goal-penalty', chalk.black.bgWhite('Penalty goal')],
    ['goal-own', chalk.black.bgWhite('Own goal')],
  ]);

  if (!eventFriendlyNames.has(eventType)) {
    return eventType;
  }

  return eventFriendlyNames.get(eventType);
}

function getFormattedMatchEventLeft(event) {
  return `${getEventTypeFriendlyName(event.type_of_event)} ${event.time} ${
    event.player
  }`;
}

function getFormattedMatchEventRight(event) {
  return `${event.player} ${event.time} ${getEventTypeFriendlyName(
    event.type_of_event,
  )}`;
}

function getShortStageName(match) {
  const stageName = match.stage_name;
  const shortStageNames = new Map([
    ['First stage', 'Gr.'],
    ['Round of 16', '1/8'],
    ['Quarter-finals', '1/4'],
    ['Semi-finals', '1/2'],
    ['Play-off for third place', '3rd'],
    ['Final', '★ '],
  ]);

  if (!shortStageNames.has(stageName)) {
    return '';
  }

  return shortStageNames.get(stageName);
}

export {
  getFormattedCountry,
  getFormattedShortCountryName,
  getFormattedDatetime,
  getFormattedMatch,
  getFormattedMatchEventLeft,
  getFormattedMatchEventRight,
  getShortFormattedMatch,
  getShortStageName,
};
