import mongoose from "mongoose";

const databaseName = "CompanyDB";

mongoose
  .connect(`mongodb://localhost/${databaseName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("Db is connected"))
  .catch((error) => console.log(error));
