package ncp.slot15.repositories;

import ncp.slot15.pojos.Product;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ProductRepository implements IProductRepository {

    private List<Product> list = new ArrayList<Product>();

    public void createProducts() {
        list = List.of(new Product(1, "product 1", 10, 100.0));
    }

    @Override
    public List<Product> getAllProducts() {
        return list;
    }

    @Override
    public Product findById(int id) {
        for (Product p : list) {
            if (p.getId() == id) {
                return p;
            }
        }
        return null;
    }

    @Override
    public List<Product> search(String name) {
        return list.stream().filter(x -> x.getName().startsWith(name)).collect(Collectors.toList());
    }

    @Override
    public Product save(Product p) {
        Product newProduct = new Product();
        newProduct.setId(p.getId());
        newProduct.setName(p.getName());
        newProduct.setQuantity(p.getQuantity());
        newProduct.setPrice(p.getPrice());
        list.add(newProduct);
        return newProduct;
    }

    @Override
    public String delete(int id) {
        list.removeIf(p -> p.getId() == id);
        return null;
    }

    @Override
    public Product update(Product product) {
        int index = 0;
        int id = 0;
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getId() == product.getId()) {
                index = product.getId();
                id = list.get(i).getId();
                break;
            }
        }

        Product product1 = new Product();
        product1.setId(product.getId());
        product1.setName(product.getName());
        product1.setQuantity(product.getQuantity());
        product1.setPrice(product.getPrice());
        list.set(index, product);
        return product1;
    }
}
