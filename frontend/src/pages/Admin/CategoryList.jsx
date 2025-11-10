import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category delection failed. Tray again.");
    }
  };

  return (
    <div className="xl:ml-[10rem] lg:ml-[10rem] md:ml-[0rem] p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        <AdminMenu />
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Category Management</h1>
            <p className="text-gray-400">Create and manage product categories</p>
          </div>

          {/* Create Category Card */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Category</h2>
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateCategory}
            />
          </div>

          {/* Categories Grid */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">All Categories</h2>
              <span className="px-3 py-1 bg-pink-600 text-white rounded-full text-sm font-semibold">
                {categories?.length || 0} Categories
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories?.map((category) => (
                <button
                  key={category._id}
                  className="group relative bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600 hover:border-pink-500 text-white py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:scale-105"
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{category.name}</span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300"></div>
                </button>
              ))}
            </div>

            {(!categories || categories.length === 0) && (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-gray-600 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-gray-400 text-lg">No categories yet</p>
                <p className="text-gray-500 text-sm mt-2">Create your first category to get started</p>
              </div>
            )}
          </div>

          {/* Update/Delete Modal */}
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <CategoryForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              handleSubmit={handleUpdateCategory}
              buttonText="Update"
              handleDelete={handleDeleteCategory}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
