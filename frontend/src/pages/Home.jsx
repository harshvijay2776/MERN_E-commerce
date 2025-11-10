import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="error">
          {error?.data?.message || error?.error || "An error occurred"}
        </Message>
      ) : (
        <>
          <div className="container mx-auto px-4 lg:px-20">
            <div className="flex justify-between items-center mt-20 mb-8">
              <h1 className="text-4xl font-bold text-white">
                Special Products
              </h1>

              <Link
                to="/shop"
                className="bg-pink-600 hover:bg-pink-700 font-bold rounded-full py-3 px-8 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
