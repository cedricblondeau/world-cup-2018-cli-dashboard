import moment from 'moment';

moment.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: 'L LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L LT',
  },
});

export default moment;
