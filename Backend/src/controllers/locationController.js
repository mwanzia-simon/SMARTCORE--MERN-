import Location from "../models/locationModel.js";

export const getRegions = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json({ success: true, locations });
  } catch (error) {
    res.json({ success: false, message: "Internal server error!" });
  }
};

export const getCities = async (req, res) => {
  try {
    const { region } = req.params;
    const location = await Location.findOne({ region });

    // If the region does not exists
    if (!location) {
      return res.json({ success: false, message: "Invalid region!" });
    }
    res.json({ success: true, location });
  } catch (error) {
    res.json({ success: false, message: "Internal server error!" });
  }
};

// Function to get the delivery fee
export const getDeliveryFee = async (req, res) => {
  try {
    const { region } = req.body;

    if (!region)
      return res.json({ success: false, message: "Region required!" });

    const targetRegion = await Location.findOne({ region });

    return res.json({ success: true, deliveryFee: targetRegion.deliveryFee });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
};
