import Counter from "../models/counterModel.js";

export const generateOrderNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { _id: "orders" },
    { $inc: { sequence: 1 } },
    {
      returnDocument: "after",
      upsert: true,
    },
  );

  return `SC-${String(counter.sequence).padStart(6, "0")}`;
};
