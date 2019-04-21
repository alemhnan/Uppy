import { SES } from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { createUserNotification } from '../../libs/Storage/Dynamo';
import { response, badRequest } from '../../libs/ResponseBuilder';

const sesClient = new SES({ region: 'eu-west-1' });

const sendEmail = async (recipient: string, text: string) => {
  const params = {
    Destination: { ToAddresses: [recipient] },
    Message: {
      Body: {
        Text: { Charset: 'UTF-8', Data: text },
      },
      Subject: { Charset: 'UTF-8', Data: 'New message' },
    },
    Source: 'alessandro@maccagnan.io',
  };

  await sesClient.sendEmail(params).promise();
};

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
  await sendEmail(email, message);

  return response({ body: notification });
};
