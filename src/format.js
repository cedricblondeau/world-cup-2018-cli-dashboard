import { flag } from 'country-emoji';

function getFormattedCountry(country) {
  const countryFlag = flag(country);
  if (!countryFlag) {
    return country;
  }

  return `${countryFlag}  ${country}`;
}

function getFormattedShortCountryName(country, fifaCode) {
  const countryFlag = flag(country);
  if (!countryFlag) {
    return `🤷  ${fifaCode}`;
  }

  return `${countryFlag}  ${fifaCode}`;
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

function getFormattedScore(match) {
  return `${match.home_team.goals}-${match.away_team.goals}`;
}

export {
  getFormattedCountry,
  getFormattedNonCompletedMatch,
  getFormattedCompletedMatch,
  getFormattedScore,
  getFormattedShortCountryName,
};
