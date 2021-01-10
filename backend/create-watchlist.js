import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const name = data.name;

  const params = {
    TableName: "watchlists",
    Item: {
      // The attributes of the item to be created
      userId: "123", // The id of the author
      watchlistId: name, // A unique uuid
      symbols: dynamoDb.createSet([""]),
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});