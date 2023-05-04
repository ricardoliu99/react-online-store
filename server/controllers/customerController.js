const Customer = require("../models/customer");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("authentication done?");
    try {
      const customer = await Customer.findOne({ username: username });
      console.log(customer);
      if (!customer) {
        console.log("Incorrect username");
        return done(null, false, { message: "Incorrect username" });
      }
      if (customer.password !== password) {
        console.log(customer.password);
        console.log(password);
        console.log("Incorrect password");
        return done(null, false, { message: "Incorrect password" });
      }
      console.log("success in LocalStrat");
      return done(null, customer);
    } catch (err) {
      console.log("error in LocalStrat");
      return done(err);
    }
  })
);

passport.serializeUser(function (customer, done) {
  done(null, customer.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const customer = await Customer.findById(id);
    done(null, customer);
  } catch (err) {
    done(err);
  }
});

exports.customerLogIn = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.status(401).json(info);
    } else {
      req.logIn(user, function () {
        res.status(200).json(req.user);
      });
    }
  })(req, res, next);
};

exports.customerLogOut = (req, res, next) => {
  console.log("customerLogOut");
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    console.log("logOut");
    res.status(200).json(req.user);
  });
};

exports.customerCreate = (req, res, next) => {
  const customer = new Customer(req.body);
  console.log(customer);
  customer
    .save()
    .then((cust) => res.json(cust))
    .catch((err) => {
      next(err);
    });
};

exports.customerGet = (req, res, next) => {
  console.log(req.params);
  Customer.find({ username: req.params.username })
    .then((cust) => res.json(cust))
    .catch((err) => next(err));
};

exports.customerUpdate = (req, res, next) => {
  const customer = new Customer(req.body);
  Customer.findByIdAndUpdate(req.params.id, customer)
    .then((cust) => {
      res.json(cust);
    })
    .catch((err) => next(err));
};

exports.customerAddToCart = (req, res, next) => {
  console.log(req.body);
  Customer.updateOne(
    { _id: req.params.id, "cart.product": req.body.product },
    {
      $set: {
        "cart.$.quantity": req.body.quantity,
      },
    }
  )
    .then((updateRes) => {
      if (updateRes.matchedCount === 0) {
        Customer.findByIdAndUpdate(req.params.id, { $push: { cart: req.body } })
          .then((cust) => {
            res.json(cust);
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

exports.customerGetCart = (req, res, next) => {
  Customer.findById(req.params.id)
    .populate("cart.product")
    .then((cust) => {
      res.json(cust.cart);
    })
    .catch((err) => console.log(err));
};

exports.customerDeleteFromCart = (req, res, next) => {
  console.log(req.body);
  Customer.findByIdAndUpdate(req.params.id, {
    $pull: { cart: { product: req.body.productId } },
  })
    .then((updateRes) => {
      res.json(updateRes);
    })
    .catch((err) => next(err));
};
