const byFifaId = fifaId => match => match.fifa_id === fifaId;

const isInProgress = match => match.status === 'in progress';

const toRelevantMatchSubset = match => ({
  fifa_id: match.fifa_id,
  home_team_events: match.home_team_events,
  away_team_events: match.away_team_events,
});

const getLastItem = arr => arr[Math.max(0, arr.length - 1)];

const getEventTimeAsNumber = event =>
  // Convert "12'" to 12
  Number(event.time.substr(0, event.time - 1));

const getMostRecentEvent = (eventA, eventB) => {
  const timeA = getEventTimeAsNumber(eventA);
  const timeB = getEventTimeAsNumber(eventB);

  return timeA > timeB ? eventA : eventB;
};

const findChangesInEventList = (updatedEventList, currentEventList) =>
  updatedEventList.filter((updatedEvent, index) => {
    const currentEvent = currentEventList[index];
    return !currentEvent || updatedEvent.id !== currentEvent.id;
  });

const findNewEventInMatch = (currentMatch, updatedMatch) => {
  const newHomeTeamEvents = findChangesInEventList(
    updatedMatch.home_team_events,
    currentMatch.home_team_events,
  );
  const newAwayTeamEvents = findChangesInEventList(
    updatedMatch.away_team_events,
    currentMatch.away_team_events,
  );

  // to avoid sending too much notifications
  // lets only return the latest event per match
  const mostRecentHomeTeamEvent = getLastItem(newHomeTeamEvents);
  const mostRecentAwayTeamEvent = getLastItem(newAwayTeamEvents);

  if (mostRecentHomeTeamEvent && mostRecentAwayTeamEvent)
    return getMostRecentEvent(mostRecentHomeTeamEvent, mostRecentAwayTeamEvent);
  if (mostRecentHomeTeamEvent) return mostRecentHomeTeamEvent;
  return mostRecentAwayTeamEvent;
};

const emptyMatchObject = fifaId => ({
  fifa_id: fifaId,
  home_team_events: [],
  away_team_events: [],
});

const findNewEventsComparingMatchesLists = (updatedMatches, currentMatches) =>
  updatedMatches
    .map(updatedMatch => {
      const targetFifaId = updatedMatch.fifa_id;
      const currentMatch =
        currentMatches.find(byFifaId(targetFifaId)) ||
        emptyMatchObject(targetFifaId);

      return findNewEventInMatch(currentMatch, updatedMatch);
    })
    .filter(event => event);

export default class EventTracker {
  constructor() {
    this.inProgressMatches = null;
  }

  findNewEvents(matches) {
    const updatedInProgressMatches = matches
      .filter(isInProgress)
      .map(toRelevantMatchSubset);

    const currentInProgressMatches = this.inProgressMatches;
    this.inProgressMatches = updatedInProgressMatches;
    const hasPastDataToCompareWith = currentInProgressMatches !== null;

    if (hasPastDataToCompareWith) {
      return findNewEventsComparingMatchesLists(
        updatedInProgressMatches,
        currentInProgressMatches,
      );
    }
    return [];
  }
}
