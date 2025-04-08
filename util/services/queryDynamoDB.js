const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

const clienteDynamo = new DynamoDBClient({ region: "us-east-1" });
const db = DynamoDBDocumentClient.from(clienteDynamo);

/**
 * Hace una query a una tabla de DynamoDB usando la partition key.
 *
 * @param {string} tableName - Nombre de la tabla.
 * @param {string} keyName - Nombre de la partition key.
 * @param {any} keyValue - Valor que hay que igualar.
 * @param {string} [indexName] - Opcional, nombre del index que se quiere hacer el query.
 * @returns {Promise<Array>} - un array con los objetos encontrados.
 */
async function queryDynamoDB(tableName, keyName, keyValue, indexName = null) {
  const command = new QueryCommand({
    TableName: tableName,
    IndexName: indexName || undefined,
    KeyConditionExpression: "#k = :v",
    ExpressionAttributeNames: {
      "#k": keyName,
    },
    ExpressionAttributeValues: {
      ":v": keyValue,
    },
  });

  try {
    const response = await db.send(command);
    return response.Items || [];
  } catch (err) {
    console.error("Error querying DynamoDB:", err);
    throw err;
  }
}

module.exports = queryDynamoDB;
