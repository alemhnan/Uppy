import { DynamoDB } from 'aws-sdk';
import { Notification } from '../../Interfaces';

let options = {};
if (process.env.IS_OFFLINE) {
  options = { region: 'localhost', endpoint: 'http://localhost:8000' };
}

const dynamoDBClient = new DynamoDB.DocumentClient(options);

// tslint:disable-next-line: variable-name
const { DYNAMODB_TABLE_NAME: TableName = 'Users' } = process.env;

export const createUserNotification = async (notification: Notification) => {

  return dynamoDBClient
    .put({ TableName, Item: notification })
    .promise();
};

export const readUserNotifications = async (email: string): Promise<Notification[]> => {
  if (!email) {
    return [];
  }

  const params = {
    TableName,
    ExpressionAttributeValues: {
      ':email': email,
    },
    ProjectionExpression: 'message, notificationId',
    KeyConditionExpression: 'email = :email',
  };
  const { Items: notifications } = await dynamoDBClient.query(params).promise();
  return notifications as Notification[];
};
