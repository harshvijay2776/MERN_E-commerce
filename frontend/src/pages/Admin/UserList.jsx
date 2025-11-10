import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaUser } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      toast.success("User updated successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const cancelEdit = () => {
    setEditableUserId(null);
    setEditableUserName("");
    setEditableUserEmail("");
  };

  return (
    <div className="p-4 md:p-8 ml-[5%] xl:ml-[5%] lg:ml-[5%] md:ml-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage all registered users</p>
        </div>
        <div className="bg-pink-600 px-6 py-3 rounded-lg">
          <p className="text-sm text-gray-200">Total Users</p>
          <p className="text-2xl font-bold text-white">{users?.length || 0}</p>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <AdminMenu />
          <div className="flex-1 overflow-x-auto">
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-6 py-4">
                        {editableUserId === user._id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editableUserName}
                              onChange={(e) => setEditableUserName(e.target.value)}
                              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                              placeholder="Username"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                              <FaUser className="text-white text-sm" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{user.username}</p>
                              <p className="text-gray-400 text-xs">ID: {user._id.substring(0, 8)}...</p>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editableUserId === user._id ? (
                          <input
                            type="email"
                            value={editableUserEmail}
                            onChange={(e) => setEditableUserEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Email"
                          />
                        ) : (
                          <a 
                            href={`mailto:${user.email}`} 
                            className="text-pink-400 hover:text-pink-300 transition-colors"
                          >
                            {user.email}
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {user.isAdmin ? (
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                              <FaCheck className="text-xs" />
                              Admin
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-gray-600/50 text-gray-300 rounded-full text-xs font-semibold">
                              User
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {editableUserId === user._id ? (
                            <>
                              <button
                                onClick={() => updateHandler(user._id)}
                                className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                title="Save"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                title="Cancel"
                              >
                                <FaTimes />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => toggleEdit(user._id, user.username, user.email)}
                                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              {!user.isAdmin && (
                                <button
                                  onClick={() => deleteHandler(user._id)}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
