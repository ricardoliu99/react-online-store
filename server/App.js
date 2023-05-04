const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config({ path: "./config.env" });

const mainRouter = require("./routes/main");
const app = express();
const port = process.env.PORT;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.ATLAS_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "hello",
    rolling: true,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoDB }),
    cookie: { maxAge: 60000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", mainRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
