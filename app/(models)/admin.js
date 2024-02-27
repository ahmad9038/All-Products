import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const adminSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Admin = mongoose.models.Admins || mongoose.model("Admins", adminSchema);
export default Admin;
