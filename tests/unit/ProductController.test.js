import { v4 as uuidv4 } from 'uuid';
import { createProduct, deleteProduct, getProductsById, updateProduct } from '../../controllers/ProductController.mjs';
import { dynamoDB } from '../../models/dbClient.mjs';
import { jest } from '@jest/globals';

const mockedResolvePath = jest.fn();
const mockProductObject = {
    productId: '12345',
    name: 'Updated Product',
    description: 'Updated description',
    price: 150,
    category: 'Updated Category',
    stock: 5,
}
jest.mock('../../models/dbClient.mjs', () => ({
  dynamoDB: {
    put: mockedResolvePath,
    update: mockedResolvePath,
    delete: mockedResolvePath,
    get: jest.fn(() => (mockProductObject)),
    scan: jest.fn(() => ([mockProductObject])),
  },
}));

describe('ProductController Tests', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

    it('should create a product and return it', async () => {
      const event = {
        input: {
          name: 'Test Product',
          description: 'Test description',
          price: 100,
          category: 'Test Category',
          stock: 10,
        },
      };

      const mockProduct = { ...event.input, productId: uuidv4().toString(), CreatedAt: '2024-12-13T00:00:00.000Z', UpdatedAt: '2024-12-13T00:00:00.000Z' };

      const result = await createProduct(event);

      expect(result).toEqual(expect.objectContaining({
        name: 'Test Product',
        description: 'Test description',
        price: 100,
        category: 'Test Category',
        stock: 10,
    }));
    });


    it('should update a product and return the updated input', async () => {
      const event = {
        input: {
          productId: '12345',
          name: 'Updated Product',
          description: 'Updated description',
          price: 150,
          category: 'Updated Category',
          stock: 5,
        },
      };

      const result = await updateProduct(event);

      expect(result).toEqual(expect.objectContaining({
            productId: '12345',
            name: 'Updated Product',
            description: 'Updated description',
            price: 150,
            category: 'Updated Category',
            stock: 5,
      }));
    });

    it('should delete a product and return the productId', async () => {
      const productId = '12345';

      const result = await deleteProduct(productId);

      expect(result).toBe(productId);
    });
});