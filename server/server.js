const express = require("express");
const cors = require("cors");
require("./config/dbConnect");
const usersRoute = require("./route/users/usersRoute");
const accountsRoute = require("./route/accounts/accountsRoute");
const transactionsRoute = require("./route/transactions/transactionsRoute");
const globalErrHandler = require("./middlewares/globalErrHandler");

const app = express();

//middlewares
app.use(express.json()); //pass incoming data
//cors middleware
app.use(cors());
//routes

//users route
app.use("/api/v1/users", usersRoute);

//account creation route
app.use("/api/v1/accounts", accountsRoute);

//transaction route
app.use("/api/v1/transactions", transactionsRoute);

// Error handlers
app.use(globalErrHandler);
//Listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is up and running on the port ${PORT}`));
