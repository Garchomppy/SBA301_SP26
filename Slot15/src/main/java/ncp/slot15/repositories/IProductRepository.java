package ncp.slot15.repositories;

import ncp.slot15.pojos.Product;

import java.util.List;

public interface IProductRepository {
        public List<Product> getAllProducts();

        public Product findById(int id);

        public List<Product> search(String name);

        public Product save(Product p);

        public String delete(int id);

        public Product update(Product product);

}
