import EventTracker from '../EventTracker';
import matchFixtures from '../../../fixtures/matches.json';

let eventTracker;

const copyMaybeArray = arr => (arr ? arr.slice() : []);

const createNewMatchData = () =>
  matchFixtures.map(match => {
    const copiedMatch = Object.assign({}, match);
    copiedMatch.home_team_events = copyMaybeArray(match.home_team_events);
    copiedMatch.away_team_events = copyMaybeArray(match.away_team_events);
    return copiedMatch;
  });

beforeEach(() => {
  eventTracker = new EventTracker();
});

describe('findEvents', () => {
  it('when the updated match lists adds one event to one match, should return that event', () => {
    const inProgressMatchIndex = 4;
    const firstMatchData = createNewMatchData();
    firstMatchData[inProgressMatchIndex].status = 'in progress';
    firstMatchData[inProgressMatchIndex].away_team_events.pop();

    expect(eventTracker.findNewEvents(firstMatchData)).toEqual([]);

    const secondMatchData = createNewMatchData();
    secondMatchData[inProgressMatchIndex].status = 'in progress';
    expect(eventTracker.findNewEvents(secondMatchData)).toEqual([
      {
        id: 60,
        player: 'Aziz BEHICH',
        time: "87'",
        type_of_event: 'yellow-card',
      },
    ]);
  });

  it('when the updated match lists adds two events to one match, should return the latest event', () => {
    const inProgressMatchIndex = 4;
    const firstMatchData = createNewMatchData();
    firstMatchData[inProgressMatchIndex].status = 'in progress';
    firstMatchData[inProgressMatchIndex].away_team_events.pop();
    firstMatchData[inProgressMatchIndex].away_team_events.pop();

    expect(eventTracker.findNewEvents(firstMatchData)).toEqual([]);

    const secondMatchData = createNewMatchData();
    secondMatchData[inProgressMatchIndex].status = 'in progress';

    expect(eventTracker.findNewEvents(secondMatchData)).toEqual([
      {
        id: 60,
        player: 'Aziz BEHICH',
        time: "87'",
        type_of_event: 'yellow-card',
      },
    ]);
  });

  it('when the updated match lists adds two events to two matches, should return the latest events', () => {
    const inProgressMatchIndex1 = 4;
    const inProgressMatchIndex2 = 5;

    const firstMatchData = createNewMatchData();
    firstMatchData[inProgressMatchIndex1].status = 'in progress';
    firstMatchData[inProgressMatchIndex1].away_team_events.pop();
    firstMatchData[inProgressMatchIndex1].away_team_events.pop();

    firstMatchData[inProgressMatchIndex2].status = 'in progress';
    firstMatchData[inProgressMatchIndex2].away_team_events.pop();
    firstMatchData[inProgressMatchIndex2].away_team_events.pop();

    expect(eventTracker.findNewEvents(firstMatchData)).toEqual([]);

    const secondMatchData = createNewMatchData();
    secondMatchData[inProgressMatchIndex1].status = 'in progress';
    secondMatchData[inProgressMatchIndex2].status = 'in progress';

    expect(eventTracker.findNewEvents(secondMatchData)).toEqual([
      {
        id: 60,
        player: 'Aziz BEHICH',
        time: "87'",
        type_of_event: 'yellow-card',
      },
      {
        id: 331,
        player: 'Alfred FINNBOGASON',
        time: "89'",
        type_of_event: 'substitution-out',
      },
    ]);
  });
});
