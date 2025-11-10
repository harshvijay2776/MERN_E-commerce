import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation
      if (!image) {
        toast.error("Please upload an image first");
        return;
      }
      if (!category) {
        toast.error("Please select a category");
        return;
      }

      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] xl:ml-[5%] lg:ml-[5%] p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        <AdminMenu />
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Product</h1>
            <p className="text-gray-400">Add a new product to your inventory</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
            {/* Image Upload Section */}
            <div className="mb-8">
              <label className="block text-gray-300 font-semibold mb-3">Product Image</label>
              {imageUrl ? (
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="product preview"
                    className="w-full max-h-[300px] object-contain rounded-lg border-2 border-gray-700 bg-gray-900"
                  />
                  <label className="absolute bottom-4 right-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-lg">
                    Change Image
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={uploadFileHandler}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-pink-500 transition-colors bg-gray-900">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 800x600px)</p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Product Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-gray-300 font-semibold mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-400">$</span>
                    <input
                      type="number"
                      id="price"
                      className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-gray-300 font-semibold mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    required
                  />
                </div>

                {/* Brand */}
                <div>
                  <label htmlFor="brand" className="block text-gray-300 font-semibold mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    id="brand"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Enter brand name"
                    required
                  />
                </div>

                {/* Stock Count */}
                <div>
                  <label htmlFor="stock" className="block text-gray-300 font-semibold mb-2">
                    Count In Stock *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Enter stock count"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-gray-300 font-semibold mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    required
                  >
                    <option value="">Choose Category</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-300 font-semibold mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter product description..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all shadow-lg"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
