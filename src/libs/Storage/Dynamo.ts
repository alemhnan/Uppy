import * as AWS from 'aws-sdk';
import { Agent } from 'https';

import { Notification } from '../../Interfaces';

let options = {};

if (process.env.IS_OFFLINE) {
  options = { region: 'localhost', endpoint: 'http://localhost:8000' };
} else {
  const sslAgent = new Agent({
    keepAlive: true,
    maxSockets: 50,
    rejectUnauthorized: true,
  });
  AWS.config.update({ httpOptions: { agent: sslAgent } });
}

const dynamoDBClient = new AWS.DynamoDB.DocumentClient(options);

const { DYNAMODB_USER_TABLE_NAME: userTableName = 'Users' } = process.env;

export const createUserNotification = async (notification: Notification) => dynamoDBClient
  .put({ TableName: userTableName, Item: notification })
  .promise();

export const readUserNotifications = async (email: string): Promise<Notification[]> => {
  if (!email) {
    return [];
  }

  const params = {
    TableName: userTableName,
    ExpressionAttributeValues: {
      ':email': email,
    },
    ProjectionExpression: 'message, notificationId',
    KeyConditionExpression: 'email = :email',
  };
  const { Items: notifications } = await dynamoDBClient.query(params).promise();
  return notifications as Notification[];
};
