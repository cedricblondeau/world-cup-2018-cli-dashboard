import emoji from 'node-emoji';
import moment from 'moment';

import { flag } from 'country-emoji';

function getCountryFlagEmoji(countryName) {
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
  return `${getCountryFlagEmoji(countryName)} ${fifaCode}`;
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

function getFormattedMatch(match) {
  if (match.status === 'completed') {
    return getFormattedCompletedMatch(match);
  }
  return getFormattedNonCompletedMatch(match);
}

function getFormattedScore(match) {
  return `${match.home_team.goals}-${match.away_team.goals}`;
}

function getFormattedDatetime(match) {
  return moment(match.datetime)
    .local()
    .format('L LT');
}

function getEventTypeEmoji(eventType) {
  const eventEmojis = new Map([
    ['yellow-card', emoji.get('warning')],
    ['red-card', emoji.get('red_circle')],
    ['goal', emoji.get('soccer')],
    ['substitution-in', emoji.get('arrow_forward')],
    ['substitution-out', emoji.get('arrow_backward')],
    ['penalty-kick', emoji.get('scream')],
    ['goal-penalty', emoji.get('soccer')],
    ['goal-own', emoji.get('soccer')],
  ]);

  if (!eventEmojis.has(eventType)) {
    return eventType;
  }
  return eventEmojis.get(eventType);
}

function getFormattedMatchEventLeft(event) {
  return `${getEventTypeEmoji(event.type_of_event)} ${event.time} ${
    event.player
  }`;
}

function getFormattedMatchEventRight(event) {
  return `${event.player} ${event.time} ${getEventTypeEmoji(
    event.type_of_event,
  )}`;
}

export {
  getFormattedCountry,
  getFormattedNonCompletedMatch,
  getFormattedCompletedMatch,
  getFormattedScore,
  getFormattedShortCountryName,
  getFormattedDatetime,
  getFormattedMatch,
  getFormattedMatchEventLeft,
  getFormattedMatchEventRight,
};
