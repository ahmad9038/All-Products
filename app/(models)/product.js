import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const productSchema = new Schema({
  name: String,
  imageLink: String,
  ProductLink: String,
});

const Product =
  mongoose.models.Products || mongoose.model("Products", productSchema);
export default Product;
