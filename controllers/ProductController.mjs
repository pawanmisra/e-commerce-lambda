import { v4 as uuidv4 } from 'uuid';

import {dynamoDB} from '../clients/dbClient.mjs';
const TABLE_NAME = 'Products-njf7zlhvlvbqrb5ibmokr6ll3e-dev';

// Hanlder for createProduct API
export const createProduct = async (event) => {
    const { name, description, price, category, stock } = event.input;
    const timestamp = new Date().toISOString();

    const params = {
        TableName: TABLE_NAME,
        Item: {
            productId: uuidv4().toString(),
            name,
            description,
            price,
            category,
            stock,
            createdAt: timestamp,
            updatedAt: timestamp,
        }
    };

    try {
        await dynamoDB.put(params).promise();
        return params.Item;
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

// Hanlder for updateProduct API
export const updateProduct = async (event) => {
    const { productId, name, description, price, category, stock } = event.input;
    const timestamp = new Date().toISOString();

    const params = {
        TableName: TABLE_NAME,
        Key: {productId: productId},
        UpdateExpression: "set #name = :n, description = :d, price = :p, category = :c, stock = :s, updatedAt = :u",
        ExpressionAttributeNames: {
            "#name": "name",
         },         
        ExpressionAttributeValues: {
            ":n": name,
            ":d": description,
            ":p": price,
            ":c": category,
            ":s": stock,
            ":u": timestamp
        }
    };

    try {
        await dynamoDB.update(params).promise();
        return event.input ;
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

// Hanlder for deleteProduct API
export const deleteProduct = async (productId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { productId: productId },
    };
    
    try {
        await dynamoDB.delete(params).promise();
        return productId;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Could not delete product');
    }
};

// Hanlder for getProductsById API
export const getProductsById = async (productId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { productId: productId },
    };

    try {
        const result = await dynamoDB.get(params).promise();
        return result.Item || null;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('Could not fetch product');
    }
};

// Hanlder for listAllProducts API
export const listAllProducts = async () => {
    const params = {
        TableName: TABLE_NAME
    };

    try {
        const result = await dynamoDB.scan(params).promise();
        return result.Items || null;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Could not fetch products');
    }
};
