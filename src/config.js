export default {
  shouldUseFixtures: process.env.USE_FIXTURES === '1',
  shouldIncludeEmojis: process.env.WITH_EMOJIS === '1',
  shouldPostNotifications: process.env.POST_NOTIFICATIONS === '1',
};
