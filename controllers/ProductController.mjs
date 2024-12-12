import {dynamoDB} from '../models/dbClient.mjs';
const TABLE_NAME = 'Products-2bzn42vh7nhcrm74cidhalg4yy-dev';

export const createProduct = async (event) => {
    const { ProductId, Name, Description, Price, Category, Stock } = JSON.parse(event.body);
    const timestamp = new Date().toISOString();

    const params = {
        TableName: TABLE_NAME,
        Item: {
            ProductId,
            Name,
            Description,
            Price,
            Category,
            Stock,
            CreatedAt: timestamp,
            UpdatedAt: timestamp,
        },
    };

    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Product created successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

export const getProduct = async (productId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: productId },
    };

    try {
        const result = await dynamoDB.get(params).promise();
        return result.Item || null;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('Could not fetch product');
    }
};