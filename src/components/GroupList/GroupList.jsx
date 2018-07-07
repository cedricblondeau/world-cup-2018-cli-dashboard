import React from 'react';
import PropTypes from 'prop-types';

import GroupDetails from './GroupDetails/GroupDetails';

const GroupList = props => {
  const groupWidth = 18;
  const groupCount = 8;

  const groups = props.groups.map((group, i) => (
    <GroupDetails
      group={group}
      key={`group-details-${group.id}`}
      left={i * groupWidth}
      width={groupWidth}
    />
  ));

  return (
    <element height={6} width={groupWidth * groupCount} left="center">
      {groups}
    </element>
  );
};

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
};

export default GroupList;
