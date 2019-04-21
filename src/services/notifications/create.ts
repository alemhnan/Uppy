import { APIGatewayProxyHandler } from 'aws-lambda';
import { createUserNotification } from '../../libs/Storage/Dynamo';
import { response, badRequest } from '../../libs/ResponseBuilder';

export const index: APIGatewayProxyHandler = async (event) => {
  if (!event.body) {
    return badRequest('Body missing');
  }

  const body = JSON.parse(event.body);

  const { email, message } = body;
  // at least one should be present
  if (!email && !message) {
    return badRequest('email or message not found');
  }

  const notification = { email, message, notificationId: Date.now() };
  await createUserNotification(notification);

  return response({ body: notification });
};
