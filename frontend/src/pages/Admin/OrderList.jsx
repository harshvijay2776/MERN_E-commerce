import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import { FaEye, FaCheckCircle, FaClock, FaTruck } from "react-icons/fa";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="p-4 md:p-8 ml-[5%] xl:ml-[5%] lg:ml-[5%] md:ml-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Order Management</h1>
          <p className="text-gray-400">Track and manage all customer orders</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-green-600 px-6 py-3 rounded-lg">
            <p className="text-sm text-gray-200">Paid Orders</p>
            <p className="text-2xl font-bold text-white">
              {orders?.filter(o => o.isPaid).length || 0}
            </p>
          </div>
          <div className="bg-blue-600 px-6 py-3 rounded-lg">
            <p className="text-sm text-gray-200">Total Orders</p>
            <p className="text-2xl font-bold text-white">{orders?.length || 0}</p>
          </div>
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
                      Items
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Delivery
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={order.orderItems[0].image}
                            alt={order._id}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                          />
                          {order.orderItems.length > 1 && (
                            <span className="text-gray-400 text-sm">
                              +{order.orderItems.length - 1} more
                            </span>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <p className="text-white font-mono text-sm">
                          #{order._id.substring(0, 8)}...
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-white font-medium">
                          {order.user ? order.user.username : "N/A"}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {order.user ? order.user.email : ""}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-gray-300">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : ""}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-white font-bold text-lg">
                          ${order.totalPrice.toFixed(2)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {order.isPaid ? (
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                              <FaCheckCircle className="text-xs" />
                              Paid
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold flex items-center gap-1">
                              <FaClock className="text-xs" />
                              Pending
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {order.isDelivered ? (
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                              <FaTruck className="text-xs" />
                              Delivered
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold flex items-center gap-1">
                              <FaClock className="text-xs" />
                              In Transit
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <Link to={`/order/${order._id}`}>
                            <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors flex items-center gap-2">
                              <FaEye />
                              View Details
                            </button>
                          </Link>
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

export default OrderList;
