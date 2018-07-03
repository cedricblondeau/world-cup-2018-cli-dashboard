import React from 'react';
import TestRenderer from 'react-test-renderer';

import matchFixture from '../../../fixtures/match.json';
import MatchNav from './MatchNav';

const getTestMatch = status => {
  const match = Object.assign({}, matchFixture);
  match.status = status;
  match.fifa_id = Math.random()
    .toString(36)
    .substr(2, 9);
  return match;
};

const getTestMatches = (status = 'completed', count = 10) =>
  new Array(count).fill().map(() => getTestMatch(status));

const getMatchNavRendered = (
  currentOrLastMatchesCount = 10,
  nextMatchesCount = 10,
  selectedPastOrCompletedMatchIndex = 0,
) =>
  TestRenderer.create(
    <MatchNav
      currentOrLastMatches={getTestMatches(
        'in progress',
        currentOrLastMatchesCount,
      )}
      nextMatches={getTestMatches('completed', nextMatchesCount)}
      selectedPastOrCompletedMatchIndex={selectedPastOrCompletedMatchIndex}
    />,
  );

describe('<MatchNav>', () => {
  it('renders properly', () => {
    expect(getMatchNavRendered().toJSON()).toMatchSnapshot();
  });
});
