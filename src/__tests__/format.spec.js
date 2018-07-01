import { getShortStageName, getFormattedDatetime } from '../format';

describe('Format match data', () => {
  describe('Stage name', () => {
    it('Returns a short stage name if it is known', () => {
      expect(getShortStageName({ stage_name: 'Quarter-finals' })).toEqual(
        '1/4',
      );
    });

    it('Returns an empty string if name is not known', () => {
      expect(getShortStageName({ stage_name: 'Round of 32' })).toEqual('');
    });
  });

  describe('Date time', () => {
    it('It returns current minute if the game is live', () => {
      expect(
        getFormattedDatetime({ status: 'in progress', time: '79' }, true),
      ).toEqual('LIVE 79');
    });
  });
});
