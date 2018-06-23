import groupFixtures from '../../fixtures/group_results.json';
import matchFixtures from '../../fixtures/matches.json';

const getGroups = async () => groupFixtures;
const getMatches = async () => matchFixtures;

export default { getGroups, getMatches };
