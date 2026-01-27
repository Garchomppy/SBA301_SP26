package ncp.slot15.services;

import ncp.slot15.pojos.Product;
import java.util.List;

public interface IProductService {
    public Product saveProduct(Product product);

    public List<Product> getProducts();

    public Product getProductById(int id);

    public String deleteProduct(int id);

    public Product updateProduct(Product product);
}
