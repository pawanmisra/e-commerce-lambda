import { v4 as uuidv4 } from 'uuid';

import {dynamoDB} from '../models/dbClient.mjs';
const TABLE_NAME = 'ProductTaxonomyAttribute-njf7zlhvlvbqrb5ibmokr6ll3e-dev';

export const createProductTaxonomy = async (event) => {
    const { name, description, parentId, type } = event.input;
    console.log(name);
    const timestamp = new Date().toISOString();

    const params = {
        TableName: TABLE_NAME,
        Item: {
            taxonomyId: uuidv4().toString(),
            name,
            description,
            parentId,
            type,
            CreatedAt: timestamp,
            UpdatedAt: timestamp,
        },
    };

    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Product taxonomy created successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

export const updateProductTaxonomy = async (event) => {
    console.log(event.input);
    const { taxonomyId, name, description, parentId, type } = event.input;
    console.log(name);
    const timestamp = new Date().toISOString();

    const params = {
        TableName: TABLE_NAME,
        Key: { taxonomyId: taxonomyId },
        UpdateExpression: "set #name = :n, description = :d, #type = :t, parentId = :p, UpdatedAt = :u",
        ExpressionAttributeNames: {
            "#name": "name",
            "#type": "type",
         },         
        ExpressionAttributeValues: {
            ":n": name,
            ":d": description,
            ":t": type,
            ":p": parentId,
            ":u": timestamp
          }
    };

    try {
        await dynamoDB.update(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Product taxonomy updated successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

const getProductTaxonomyByParentId = async (parentId) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: "ParentIndex",
        KeyConditionExpression: "parentId = :s",
        ExpressionAttributeValues: {
            ":s": parentId,
          },
    };

    try {
        const result = await dynamoDB.query(params).promise();
        return result.Items || null;
    } catch (error) {
        console.log('Error fetching product taxonomy by parent id:', error);
        return null;
    }
}

export const deleteProductTaxonomy = async (taxonomyId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { taxonomyId: taxonomyId },
    };

    try {
        // check if the given id is parentId of any item
        const existingTaxonomyWithGivenIdAsParent = await getProductTaxonomyByParentId(taxonomyId);
        console.log(existingTaxonomyWithGivenIdAsParent)
        if (existingTaxonomyWithGivenIdAsParent) {
            console.log("inside if condition")
            return {
                statusCode: 409,
                body: JSON.stringify({ message: 'Product taxonomy cannot be deleted as its already associated with other items.' }),
            };
        }
        console.log("after if condition")
        await dynamoDB.delete(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Product taxonomy successfully' }),
        };
    } catch (error) {
        console.error('Error deleting product taxonomy:', error);
        throw new Error('Could not delete product taxonomy');
    }
};

export const getProductTaxonomyById = async (taxonomyId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { taxonomyId: taxonomyId },
    };

    try {
        const result = await dynamoDB.get(params).promise();
        return result.Item || null;
    } catch (error) {
        console.error('Error fetching product taxonomy:', error);
        throw new Error('Could not fetch taxonomy');
    }
};

export const listAllProductTaxonomies = async () => {
    const params = {
        TableName: TABLE_NAME
    };

    try {
        const result = await dynamoDB.scan(params).promise();
        return result.Items || null;
    } catch (error) {
        console.error('Error fetching product taxonomies:', error);
        throw new Error('Could not fetch product taxonomies');
    }
};