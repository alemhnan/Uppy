import { APIGatewayProxyHandler } from 'aws-lambda';
import { readUserNotifications } from '../../libs/Storage/Dynamo';
import { response } from '../../libs/ResponseBuilder';

export const index: APIGatewayProxyHandler = async (event) => {
  const email = decodeURIComponent(event.pathParameters!.email);
  const notifications = await readUserNotifications(email);

  return response({ body: notifications });
};
