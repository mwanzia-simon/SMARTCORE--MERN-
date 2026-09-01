import React, { useEffect, useState } from "react";
import { add_address_img } from "../assets/assets";
import { useAppContext } from "./../context/AppContext";
import { toast } from "react-toastify";
import api from "../api/axios";

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-border-color rounded outline-none text-primary focus:border-accent transition bg-card"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const {  user, navigate } = useAppContext();
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    region: "",
    city: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };


  // Function to add the addresses to the db
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await api.post("/api/address/add", { address });

      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

// Function to get all the regions
  const getRegions = async () => {
    try {
      const { data } = await api.get("/api/location/regions");

      if (data.success) {
        setRegions(data.locations);
        console.log(regions);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  // Function to get the cities based on the region
  const getCities = async () => {
    try {
      const { data } = await api.get(`/api/location/cities/${address.region}`);

      if (data.success) {
        setCities(data.location.city);
        console.log(cities);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
    getRegions();
  }, []);

  // Running a useEffect to fetch the cities when thw region changes
  useEffect(() => {
    if (!address.region == "") {
      getCities();
    }
  }, [address.region]);

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-primary">
        Add Delivery{" "}
        <span className="font-semibold text-secondary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-10">
        <div className="flex-1 max-w-md">
          <form className="space-y-3 mt-6 text-sm" onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email Address"
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                value={address.region}
                onChange={(e) =>
                  setAddress({ ...address, region: e.target.value })
                }
                className="w-full px-2 py-2.5 border border-border-color rounded outline-none text-primary focus:border-accent transition bg-card"
              >
                <option value="">Select Region</option>
                {/* Populate from the api (Regions)*/}
                {regions.map((item) => (
                  <option key={item._id} value={item.region}>
                    {item.region}
                  </option>
                ))}
              </select>

              <select
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="w-full px-2 py-2.5 border border-border-color rounded outline-none text-primary focus:border-accent transition bg-card"
              >
                <option value="">Select City</option>
                {/* Populate from the api (city)*/}
                  {cities.map((item,index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 bg-accent text-white py-3 hover:bg-accent-hover transition cursor-pointer uppercase ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save Address"}
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0 w-[312px] mx-auto"
          src={add_address_img}
          alt="Add Address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
