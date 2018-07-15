import React from 'react';
import TestRenderer from 'react-test-renderer';

import matchFixture from '../../../fixtures/match.json';
import MatchNav from './MatchNav';
import MatchNavItem from './MatchNavItem/MatchNavItem';

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
  selectedPastOrCompletedMatchIndex = 0,
) =>
  TestRenderer.create(
    <MatchNav
      currentOrLastMatches={getTestMatches(
        'in progress',
        currentOrLastMatchesCount,
      )}
      selectedPastOrCompletedMatchIndex={selectedPastOrCompletedMatchIndex}
    />,
  );

describe('<MatchNav>', () => {
  const actualStdoutColumns = process.stdout.columns;
  const maxNavItemsOnScreen = 5;
  const matchNavItemWidth = 23;

  beforeAll(() => {
    const extraWidth = 6;
    global.process.stdout.columns =
      matchNavItemWidth * maxNavItemsOnScreen + extraWidth;
  });

  afterAll(() => {
    global.process.stdout.columns = actualStdoutColumns;
  });

  it('renders the right number of nav items', () => {
    const currentOrLastMatchesCount = 20;

    const matchNavRendered = getMatchNavRendered(currentOrLastMatchesCount);

    const expectedVisiblePastOrCurrentNavItems = maxNavItemsOnScreen + 1;
    const expectedVisibleNavItems = expectedVisiblePastOrCurrentNavItems;
    expect(matchNavRendered.root.findAllByType(MatchNavItem).length).toEqual(
      expectedVisibleNavItems,
    );
  });

  it('renders remaining items on the nav items on the last page', () => {
    const currentOrLastMatchesCount = 13;
    const selectedPastOrCompletedMatchIndex = 12;

    const matchNavRendered = getMatchNavRendered(
      currentOrLastMatchesCount,
      selectedPastOrCompletedMatchIndex,
    );

    expect(matchNavRendered.root.findAllByType(MatchNavItem).length).toEqual(3);
  });

  it('should not crash if index out of bounds', () => {
    const currentOrLastMatchesCount = 13;
    const selectedPastOrCompletedMatchIndex = 50;

    const matchNavRendered = getMatchNavRendered(
      currentOrLastMatchesCount,
      selectedPastOrCompletedMatchIndex,
    );

    expect(matchNavRendered.root.findAllByType(MatchNavItem).length).toEqual(0);
  });

  it('selects the right match nav item', () => {
    const currentOrLastMatchesCount = 20;
    const selectedPastOrCompletedMatchIndex = 3;

    const matchNavRendered = getMatchNavRendered(
      currentOrLastMatchesCount,
      selectedPastOrCompletedMatchIndex,
    );

    expect.assertions(maxNavItemsOnScreen + 1);
    matchNavRendered.root
      .findAllByType(MatchNavItem)
      .forEach((matchNavItem, i) => {
        if (i === selectedPastOrCompletedMatchIndex) {
          expect(matchNavItem.props.isSelected).toBe(true);
        } else {
          expect(matchNavItem.props.isSelected).toBe(false);
        }
      });
  });

  it('selects the right match nav item on next page', () => {
    const currentOrLastMatchesCount = 20;
    const selectedPastOrCompletedMatchIndex = 8;

    const matchNavRendered = getMatchNavRendered(
      currentOrLastMatchesCount,
      selectedPastOrCompletedMatchIndex,
    );

    const expectedSelectedItemIndex = Math.floor(
      selectedPastOrCompletedMatchIndex % maxNavItemsOnScreen,
    );
    expect.assertions(maxNavItemsOnScreen + 1);
    matchNavRendered.root
      .findAllByType(MatchNavItem)
      .forEach((matchNavItem, i) => {
        if (i === expectedSelectedItemIndex) {
          expect(matchNavItem.props.isSelected).toBe(true);
        } else {
          expect(matchNavItem.props.isSelected).toBe(false);
        }
      });
  });
});
