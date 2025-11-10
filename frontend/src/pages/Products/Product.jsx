import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </Link>
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-white mb-2 hover:text-pink-500 transition-colors line-clamp-1">
            {product.name}
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-pink-500">
              ${product.price}
            </span>
            {product.brand && (
              <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                {product.brand}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
