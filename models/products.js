// const productSchema =new Schema({
//     title: String,
//     image: String,
//     price:Number,
//     prePrice:Number,
//     discount:String,
// })

const mongoose = require("mongoose");
const { type } = require("os");
const { Schema } = mongoose;

// const productSchema = new Schema({
//   role: { type: String, required: true },
//   data: [
//     {
//       title: { type: String, required: true },
//       price: { type: Number, required: true },
//       prePrice: { type: Number, required: true },
//       discount: { type: String, required: true },
//     },
//   ],
// });
const dataSchema = new Schema({

    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    prePrice: { type: Number, required: true },
    discount: { type: String, required: true },

})
const productSchema = new Schema({
  category: { type: String, required: true },
  data: dataSchema
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
