import axios from 'axios';

const getGroups = async () => {
  const response = await axios.get(
    'https://worldcup.sfg.io/teams/group_results',
  );
  return response.data;
};

const getMatches = async () => {
  const response = await axios.get('https://worldcup.sfg.io/matches');
  return response.data;
};

export default { getGroups, getMatches };
