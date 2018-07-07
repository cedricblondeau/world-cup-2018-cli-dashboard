import chalk from 'chalk';

import {
  getShortStageName,
  getFormattedDatetime,
  getColoredCountryName,
  getFormattedShortCountryName,
} from './format';

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

  describe('Colored country name', () => {
    it('Returns a colored country name for an existing country', () => {
      expect(getColoredCountryName('France')).toEqual(
        chalk.bgWhite.blue.bold('France'),
      );
    });

    it('Returns just a bold name for a non existing country', () => {
      expect(getColoredCountryName('Wonderland')).toEqual(
        chalk.white.bold('Wonderland'),
      );
    });
  });

  describe('Formatted short country name', () => {
    it('Returns a Formatted short country name for an existing country', () => {
      expect(getFormattedShortCountryName('Brazil', 'BRA')).toEqual(
        `${chalk.yellow('■')} BRA`,
      );
    });

    it('Returns a default value for a non existing country', () => {
      expect(getFormattedShortCountryName('Wonderland', 'WON')).toEqual(
        `${chalk.white('■')} WON`,
      );
    });
  });
});
