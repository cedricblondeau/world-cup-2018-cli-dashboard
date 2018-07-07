import chalk from 'chalk';

import countryNameColors from './country-name-colors';
import flagColors from './flag-colors';
import moment from '../moment';

function getColoredCountryName(countryName) {
  if (Object.prototype.hasOwnProperty.call(countryNameColors, countryName)) {
    return chalk`{${countryNameColors[countryName]}.bold ${countryName}}`;
  }
  return chalk.white.bold(countryName);
}

function getFormattedShortCountryName(countryName, fifaCode) {
  if (Object.prototype.hasOwnProperty.call(flagColors, countryName)) {
    return chalk`{${flagColors[countryName]} ■} ${fifaCode}`;
  }
  return `${chalk.white('■')} ${fifaCode}`;
}

function getFormattedScore(match) {
  return `${match.home_team.goals}-${match.away_team.goals}`;
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
  getColoredCountryName,
  getFormattedShortCountryName,
  getFormattedDatetime,
  getFormattedMatchEventLeft,
  getFormattedMatchEventRight,
  getShortFormattedMatch,
  getShortStageName,
};
