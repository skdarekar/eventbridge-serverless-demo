const AWS = require('aws-sdk');
const eventBridge = new AWS.EventBridge();

module.exports.publishEvent = async (event) => {
  console.log("Publish Event:",event);
  const params = {
    Entries: [
      {
        Source: 'my-source',
        DetailType: 'my-detail-type',
        Detail: JSON.stringify(JSON.parse(event.body)),
      },
    ],
  };

  try {
    const data = await eventBridge.putEvents(params).promise();
    console.log(`Event published: ${JSON.stringify(event.body)}`);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err }),
    };
  }
};

module.exports.consumeEvent = async (event) => {
  console.log(`Event consumed: ${JSON.stringify(event.detail)}`);
};