import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to database");
    process.exit(1);
  }
};

export default dbConnection;
