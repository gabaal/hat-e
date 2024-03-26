import products from "../SCproducts.json";
import productJSON from "../components/update-products-json";

export default function page() {
  productJSON();
  console.log(products);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <h1></h1>
      {products.map((product) => {
        
        return (
          <div
            key={product.id}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            
            <h3>{product.product_name}</h3>
            <p>{product.product_description}</p>
            <img src={product.product_image_url} />
            <p>£{product.product_price}</p>
            <p>Avg Customer Review {product.average_rating}</p>
            <p>
              <button
                className="buy-button snipcart-add-item"
                data-item-id={product.id}
                data-item-image={product.image_url}
                data-item-name={product.product_name}
                data-item-price={product.price}
                
              >
                Add to Cart
              </button>
            </p>
          </div>
        );
      })}
    </div>
  );
}