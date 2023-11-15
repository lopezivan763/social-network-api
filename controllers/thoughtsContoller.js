const { Thought, User } = require("../models");

module.exports = {
  //* get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //* get a single thought
  async singleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtsId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //* create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body)
      const user = await User.findOneAndUpdate(
        
        //* create association with a user ($addToSet)
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'thought created, but found no user with that ID',
        })
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //* update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //* delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete(
        {_id: req.params.thoughtsId,});

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      const user = await User.findOneAndRemove(
        { thoughts: req.params.thoughtsId },
        { $pull: { thoughts: req.params.thoughtsId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'thought deleted but no user with this id!',
        });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //* create a reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //* delete reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
