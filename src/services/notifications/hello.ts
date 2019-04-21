import { APIGatewayProxyHandler } from 'aws-lambda';

export const index: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ hello: 'World' }, null, 2),
  };
};
