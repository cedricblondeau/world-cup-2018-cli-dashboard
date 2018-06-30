import axios from 'axios';
import groupFixtures from '../../fixtures/group_results.json';

const getGroups = async () => groupFixtures;

const getMatches = async () => {
  const response = await axios.get('https://worldcup.sfg.io/matches');
  return response.data;
};

export default { getGroups, getMatches };
