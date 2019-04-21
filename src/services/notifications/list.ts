import { APIGatewayProxyHandler } from 'aws-lambda';
import { readUserNotifications } from '../../libs/Storage/Dynamo';

export const index: APIGatewayProxyHandler = async () => {

  const c = await readUserNotifications('alessandro.maccagnan@gmail.com');

  const message = {
    c,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(message, null, 2),
  };
};
