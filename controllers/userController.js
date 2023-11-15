const { User, Thought } = require("../models");

(success = "user created"), User;
module.exports = {
  //* Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //* get user by id
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //* create new user
  async createUser(req, res) {
    try {
      await User.create(req.body);
      res.json({ message: "User succesfully created" });
      // res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //* delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: "User and thoughts succesfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //* update user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.json({ message: "User succesfully updated" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //* post a new friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //* delte a friend
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
