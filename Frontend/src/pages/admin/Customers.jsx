import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { formatDate } from "../../lib/utils";
import { Mail, PenBox, Trash2Icon, User } from "lucide-react";
import Loader from "../../components/Loader";
import { useAppContext } from "../../context/AppContext";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const { navigate } = useAppContext();

  // Getting the customers list when the page loads
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const { data } = await api.get("/api/customers");
        data.success && setCustomers(data.customers);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getCustomers();
  }, []);

  // Function to delete customers
  const handleDeleteCustomer = async (deleteCustomerId) => {
    setIsDeleting(true);
    try {
      const { data } = await api.delete(`/api/customers/delete/${deleteCustomerId}`);

      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
        setCustomers((prev) =>
          prev.filter((customer) => customer._id !== deleteCustomerId),
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };



  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium text-primary">Customer List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-primary">
            <thead className="bg-card text-sm  text-primary">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer, index) => (
                  <tr
                    key={customer._id}
                    className="border-b border-border-color hover:bg-card/20 cursor-pointer"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{customer._id.slice(0, 10)}</td>
                    <td className="p-4">
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td className="p-4">{customer.email}</td>
                    <td className="p-4">{customer.phoneNumber}</td>
                    <td className="p-4">
                      {formatDate(new Date(customer.joined))}
                    </td>
                    <td className="p-4 flex items-center justify-center gap-5">
                      <PenBox
                        onClick={() => navigate(`/admin/customer-details/${customer._id}`)}
                        size={20}
                        className="cursor-pointer"
                      />
                      <Trash2Icon
                        onClick={() => {
                          setDeleteCustomerId(customer._id);
                          setShowModal(true);
                        }}
                        size={20}
                        className="cursor-pointer text-red-500"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-primary">
                    No customers yet!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Confirm Deletion
            </h3>
            <p className="text-muted mb-6">
              Are you sure you want to delete this customer? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 cursor-pointer rounded-md border border-border-color hover:bg-gray-700 transition text-primary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCustomer(deleteCustomerId)}
                disabled={isDeleting}
                className={`px-4 py-2 cursor-pointer rounded-md bg-red-500 text-white transition ${
                  isDeleting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-600"
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
