import { createProduct, deleteProduct, listAllProducts, updateProduct } from '../controllers/ProductController.mjs';
import { createProductTaxonomy, deleteProductTaxonomy, getProductTaxonomyById, listAllProductTaxonomies, updateProductTaxonomy } from '../controllers/ProductTaxanomyController.mjs';

const pathResolvers = {
    'Query': {
        'listAllProducts': (event) => {
            return listAllProducts(event.arguments)
        }, 
        'getProductsById': (event) => {
            return listAllProducts(event.arguments.productId)
        }, 
        'listAllProductTaxonomies': (event) => {
            return listAllProductTaxonomies(event.arguments)
        }, 
        'getProductTaxonomyById': (event) => {
            return getProductTaxonomyById(event.arguments.TaxonomyId)
        },
    },
    'Mutation': {
        'createProduct': (event) => {
            return createProduct(event.arguments)
        },
        'updateProduct': (event) => {
            return updateProduct(event.arguments)
        },
        'deleteProduct': (event) => {
            return deleteProduct(event.arguments.productId)
        },
        'createProductTaxonomy': (event) => {
            return createProductTaxonomy(event.arguments)
        },
        'updateProductTaxonomy': (event) => {
            return updateProductTaxonomy(event.arguments)
        },
        'deleteProductTaxonomy': (event) => {
            return deleteProductTaxonomy(event.arguments.TaxonomyId)
        },
    }
}

export const resolvePath = (operationType, operationName) => {
    const typeHandler = pathResolvers[operationType];
    if (typeHandler){
      const opResolver = typeHandler[operationName];
      if (opResolver){
        console.log(opResolver)
        return opResolver;
      }
      return null
    }
}