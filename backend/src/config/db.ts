import mongoose, { ConnectOptions } from "mongoose";

export const connection = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connectionParam: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions;

    mongoose.connect(process.env.MONGODB_URI ?? "", connectionParam, () => {
      console.log("Connected to db");
    });
  } catch (error) {
    console.log(error, " Couldnot connect to the database");
  }
};
