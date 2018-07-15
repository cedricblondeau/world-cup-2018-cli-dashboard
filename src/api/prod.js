import matchFixtures from '../../fixtures/matches.json';
import groupFixtures from '../../fixtures/group_results.json';

const getGroups = async () => groupFixtures;

const getMatches = async () => matchFixtures;

export default { getGroups, getMatches };
