import { createUserNotification, readUserNotifications } from './Dynamo';

const message = 'I am a message';
const email = 'test@example.com';

test('should create a notification', async () => {
  const notification = {
    message,
    email: 'test@example.com',
    notificationId: Date.now(),
  };
  await expect(createUserNotification(notification)).resolves.not.toThrow();
});

test('should return the notifications for one email', async () => {
  const notifications = await readUserNotifications(email);
  expect(notifications[0].message).toBe(message);
});

test('should return empty array if no notifications', async () => {
  const notifications = await readUserNotifications('noemail');
  expect(notifications.length).toBe(0);
});
