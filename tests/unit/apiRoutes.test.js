import { jest } from '@jest/globals';
import { resolvePath } from '../../routes/apiRoutes.mjs'; // Update with the actual path to your file
import * as ProductController from '../../controllers/ProductController.mjs';
import * as ProductTaxonomyController from '../../controllers/ProductTaxanomyController.mjs';

describe('resolvePath', () => {
  it('should resolve Query for listAllProducts', () => {
    const resolver = resolvePath('Query', 'listAllProducts');
    expect(resolver).toBeInstanceOf(Function);
    expect(resolver.name).toEqual(ProductController.listAllProducts.name)
  });

  it('should resolve Query for getProductsById', () => {
    const resolver = resolvePath('Query', 'getProductsById');
    expect(resolver).toBeInstanceOf(Function);
    expect(resolver.name).toEqual(ProductController.getProductsById.name)
  });

  it('should resolve Mutation for createProduct', () => {
    const resolver = resolvePath('Mutation', 'createProduct');
    expect(resolver).toBeInstanceOf(Function);
    expect(resolver.name).toEqual(ProductController.createProduct.name)
  });

  it('should resolve Mutation for deleteProductTaxonomy', () => {
    const resolver = resolvePath('Mutation', 'deleteProductTaxonomy');
    expect(resolver).toBeInstanceOf(Function);
    expect(resolver.name).toEqual(ProductTaxonomyController.deleteProductTaxonomy.name)
  });

  it('should return null for invalid operation name', () => {
    const resolver = resolvePath('Query', 'nonExistentOperation');
    expect(resolver).toBeNull();
  });

  it('should return null for invalid operation type', () => {
    const resolver = resolvePath('InvalidType', 'listAllProducts');
    expect(resolver).toBeNull();
  });

  it('should log resolver for valid operations', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const resolver = resolvePath('Query', 'listAllProducts');
    expect(resolver).toBeInstanceOf(Function);
    resolver({ arguments: {} });
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Function));
    consoleSpy.mockRestore();
  });
});
