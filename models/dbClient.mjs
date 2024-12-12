import AWS from 'aws-sdk';

// Configure DynamoDB client
const options = {
    region: process.env.AWS_REGION || 'us-west-2',
    maxRetries: 3,
    httpOptions: {
        timeout: 5000, // Timeout in ms
    },
};

// Use DynamoDB Local for testing if an endpoint is specified
// if (process.env.DYNAMODB_ENDPOINT) {
//     options.endpoint = process.env.DYNAMODB_ENDPOINT;
// }
options.endpoint = "https://dynamodb.us-west-2.amazonaws.com"




// Create the DynamoDB DocumentClient
const dynamoDB = new AWS.DynamoDB.DocumentClient(options);
const a = 10;

export {dynamoDB, a};

