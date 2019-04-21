import { DynamoDB } from 'aws-sdk';

let options = {};
if (process.env.IS_OFFLINE) {
  options = { region: 'localhost', endpoint: 'http://localhost:8000' };
}

const dynamoDBClient = new DynamoDB.DocumentClient(options);

// tslint:disable-next-line: variable-name
const { DYNAMODB_TABLE_NAME: TableName = 'Users' } = process.env;

export const createUserNotification = async (email: string) => {
  const timestamp = Date.now();

  // tslint:disable-next-line: variable-name
  // const Item = {
  //   email,
  //   notificationId: timestamp,
  // };

  return dynamoDBClient
    .put({
      TableName,
      Item: { email, notificationId: timestamp },
    })
    .promise();
};

export const readUserNotifications = async (email: string) => {

  const params = {
    TableName,
    ExpressionAttributeValues: {
      ':email': email,
    },
    // ProjectionExpression: '#timestamp, id, userId, ui, service',
    KeyConditionExpression: 'email = :email',
    // ExpressionAttributeNames: {
    //   '#ui': 'ui',
    //   '#timestamp': 'timestamp',
    // },
    // FilterExpression: 'attribute_exists(#ui) and NOT #ui = :null',
    ScanIndexForward: false,
    // Limit: PAGINATION_LIMIT,
  };
  return dynamoDBClient.query(params).promise();
};
