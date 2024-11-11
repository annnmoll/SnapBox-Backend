import Order from "../model/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const {
      name,
      gender,
      selectedFrame,
      transactionId,
      amountPaid,
      numberOfCopies,
      rating,
      remarks,
      location,
      transactionStatus,
    } = req.body;

    const order = new Order({
      name,
      gender,
      selectedFrame,
      transactionId,
      amountPaid,
      location,
      remarks,
      numberOfCopies,
      rating,
      transactionStatus,
    });
    //save
    const newOrder = await order.save();
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { id, name, transactionId } = req.query;

    //fetch all orders and filter as per query params  populate selectedFrame
    //name could be in any casing so we use regex to make it case insensitive

    const orders = await Order.find({
      $and: [
        { _id: id ? id : { $ne: null } },
        { name: name ? { $regex: name, $options: "i" } : { $ne: null } },
        {
          transactionId: transactionId ? transactionId : { $ne: null },
        },
      ],
    }).populate("selectedFrame", "name price");
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
