import React from 'react';
import TestRenderer from 'react-test-renderer';

import groups from '../../../fixtures/group_results.json';
import GroupList from './GroupList';

describe('<GroupList>', () => {
  it('Renders properly', () => {
    const groupListRendered = TestRenderer.create(
      <GroupList groups={groups} />,
    );
    expect(groupListRendered.toJSON()).toMatchSnapshot();
  });
});
