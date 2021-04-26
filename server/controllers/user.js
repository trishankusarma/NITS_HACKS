const { Product, User, CartItem } = require("../models");
const { options,errorResConfig} = require("../utils");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
const bcrypt = require("bcryptjs");

const userContoller = {
  // AUTH
  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findByCredentials(email, password);

      if (!user) {
        res.json({ user: null, error: "Invalid credentials" });
      }

      const token = await user.generateAuthToken();

      res.cookie("authorization", token, options);

      res.json({ user, error: null, token });
    } catch (error) {
      console.log(error);
      errorResConfig(error, res);
    }
  },
  registration: async (req, res, next) => {
    try {
      const { name, email, phoneNo, password } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        res.json({ user: null, error: "Email Already Exists" });
      }

      const newUser = new User({
        name,
        email,
        phoneNo,
        password,
      });

      const token = await newUser.generateAuthToken();

      res.cookie("authorization", token, options);

      await newUser.save();

      // const url = `http://localhost:3000/confirmation/${token}`;

      // utils.sendEmail(email, url , 'Confirm Email');

      res.json({ user: newUser, error: null, token });
    } catch (error) {
      console.log(error);
      errorResConfig(error, res);
    }
  },
  logout: async (req, res, next) => {
    try {
      res.clearCookie("authorization");

      res.json({ user: null, error: null });
    } catch (error) {
      console.log(error);
      errorResConfig(error, res);
    }
  },
  // GET
  get_profile: async (req, res, next) => {
    try {
      const data = await User.findById(req.user._id);
      res.status(200).json({
        user: data,
        error: null,
      });
    } catch (error) {
      console.log(error);
      errorResConfig(error, res);
    }
  },
  getAll_products: async (req, res, next) => {
    try {
      const data = await Product.find({});
      res.status(200).json({
        user: data,
        error: null,
      });
    } catch (error) {
      console.log(error);
      errorResConfig(error, res);
    }
  },
  getOne_product: async (req, res, next) => {
    try {
      const data = await Product.findById(req.params.id);

      res.status(200).json({
        user: data,
        error: null,
      });
    } catch (error) {
      console.log(error);
      errorResConfig(error, res);
    }
  },
  addTocart: async (req, res, next) => {
    try {
      const { id } = req.body;
      const data = await CartItem.findByIdAndUpdate({
        $push: { addTo: id },
      });

      res.status(200).json({
        user: data,
        error: null,
      });
    } catch (error) {
      console.log(error);
      errorResConfig(error, res);
    }
  },
  saveLater: async (req, res, next) => {
    try {
      const { id } = req.body;
      const data = await CartItem.findByIdAndUpdate({
        $push: { saveLater: id },
      });

      res.status(200).json({
        user: data,
        error: null,
      });
    } catch (error) {
      console.log(error);
      errorResConfig(error, res);
    }
  },
  Bought: async (req, res, next) => {
    try {
      const { id } = req.body;
      const data = await CartItem.findByIdAndUpdate({
        $push: { Bought: id },
      });

      res.status(200).json({
        user: data,
        error: null,
      });
    } catch (error) {
      console.log(error);
      errorResConfig(error, res);
    }
  },
  // PUT
  update_profile: async (req, res) => {
    try {
      const user = req.user;

      user.name = req.body.name;
      user.email = req.body.email;
      user.phoneNo = req.body.phoneNo;

      if (req.file !== undefined) {
        user.profileType = req.file.mimetype;
        user.profile = req.file.buffer;
      }

      await user.save();

      res.json({ user, error: null });
    } catch (error) {
      res.json({ user: null, error: "Internal Server Error" });
    }
  },
  // PASSWORD
  forget: async () => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
      } else {
        const token = buffer.toString("hex");
        // findOne will return object where else find return array
        User.findOne({ Email: req.body.Email }).then((Info) => {
          if (!Info) {
            return res.status(404).json("User with this email does not exits");
          }

          Info.ResetToken = token;
          // exp after 2 min
          Info.ExpireToken = Date.now() + 120000;

          Info.save().then((result) => {
            transporter
              .sendMail({
                to: req.body.Email,
                from: "jitulteron9@gmail.com",
                subject: "Password Reset",
                html: `<h4>Click <a href="https://ben-ven.herokuapp.com/reset/${token}">Here</a></h4>`,
              })
              .then((data) => res.json({ meg: "Check Your Email Please" }));
          });
        });
      }
    });
  },
  reset: async () => {
    try {
      const newPassword = req.body.Password;
      const setToken = req.body.token;

      User.findOne({
        ResetToken: setToken,
        ExpireToken: { $gt: Date.now() },
      }).then((user) => {
        if (!user) {
          return res.status(404).json({ msg: "session expired try again" });
        }
        bcrypt.hash(newPassword, 12).then((hashed) => {
          user.Password = hashed;
          user.ResetToken = undefined;
          user.setToken = undefined;
          user.save().then((info) => {
            res.json({ msg: "Password Updated !" });
          });
        });
      });
    } catch (error) {
      console.log(error);
      errorResConfig(error, res);
    }
  },
};

module.exports = {
  userContoller,
};
