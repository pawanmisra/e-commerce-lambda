import { resolvePath } from "./routes/apiRoutes.mjs";


export const handler = async (event) => {
    console.log(event);
    const operationType = event.typeName; // Type of operation - in our case, Query or mutation
    const operationName = event.fieldName // nbame of the operation - getProductsById, listAllProducts, and so on
    
    const responseHeaders = {
      'Content-Type': 'application/json',
  };
   const resolver = resolvePath(operationType, operationName);
   if (resolver){
    var result = await resolver(event);
    console.log(result);
    if (result) {
      return {
          statusCode: 200,
          headers: responseHeaders,
          body: JSON.stringify(result),
      };
    }
   }
   return {
    statusCode: 404,
    headers: responseHeaders,
    body: JSON.stringify({ error: 'No handler found for the given request.' }),
  };
};