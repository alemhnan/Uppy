# Uppy

The project is written in typescript using the serverless framework. It's configured to deploy in AWS. Every lambda has strict specific permissions and is packaged singulary. The two lambdas are less than 3K in size. The fastest of the two take less than 100ms to answer from a warm state. The other one around ~200ms. Both take less than 500ms from a cold state.

To run locally:

`npm install`

`npx sls dynamodb install`

`npm run start.local`

There are two endpoints:

#### [POST] `/notifications
The body should be a json object with `email` and `message`. It will send the `message` to the `email` address.

#### [GET] `/notifications/{email}`
It will return an array of notifications (message, timestamp) sent to that email address.

The notifications are stored in DynamoDB.

To run the tests:

`npm sls dynamodb start`

`npm test`

### TODO

- Use an authorizer for authorization/authentication;
- Better error handling;
- Enable local debugging.



