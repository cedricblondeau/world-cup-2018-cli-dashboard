import notifier from 'node-notifier';

const createNotification = event => ({
  title: event.type_of_event,
  message: `${event.player} ${event.time}`,
});

const notify = events =>
  events.forEach(ev => {
    notifier.notify(createNotification(ev));
  });

export default { notify };
