import { createProduct, getProduct } from './controllers/ProductController.mjs';


export const handler = async (event) => {
    let productId = "d376f2a7-c9e3-438b-a893-7b53dbf6d320";
    const product = await getProduct(productId);

    const responseHeaders = {
      'Content-Type': 'application/json',
  };

    if (product) {
        return {
            statusCode: 200,
            headers: responseHeaders,
            body: JSON.stringify(product),
        };
    }
    return {
      statusCode: 404,
      headers: responseHeaders,
      body: JSON.stringify({ error: 'Product not found' }),
  };
};
