import { APIGatewayProxyResult } from 'aws-lambda';

export const response = ({ statusCode = 200, body = {}, cors = true }): APIGatewayProxyResult => {
  const response: APIGatewayProxyResult = {
    statusCode,
    body: JSON.stringify(body),
  };
  if (cors) {
    response.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    };
  }
  return response;
};

export const badRequest = (message: string) => response({ body: { message }, statusCode: 400 });
