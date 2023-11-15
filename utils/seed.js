const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { userData, thoughtsData, reactionData } = require('./data');

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process with an error code
});

connection.once('open', async () => {
  console.log('connected');

  try {
    // Drop existing collections if they exist
    await User.deleteMany();
    await Thought.deleteMany();
    await Reaction.deleteMany();
    console.log('Collections dropped successfully');
  } catch (error) {
    console.log('Collections did not exist, skipping drop');
  }

  try {
    // Seed users
    const seededUsers = await User.insertMany(userData);
    console.log(`${seededUsers.length} users seeded successfully`);

    // Seed thoughts
    const thoughtsWithUsers = thoughtsData.map((thought) => {
      const user = seededUsers.find((user) => user.username === thought.username);
      thought.userId = user._id;
      return thought;
    });
    const seededThoughts = await Thought.insertMany(thoughtsWithUsers);
    console.log(`${seededThoughts.length} thoughts seeded successfully`);

    // Seed reactions
    // const reactionsWithThoughts = reactionData.map((reaction) => {
    //   const thought = seededThoughts.find((thought) => thought.username === reaction.username);
    //   reaction.thoughtId = thought._id;
    //   return reaction;
    // });
    // const seededReactions = await Reaction.insertMany(reactionsWithThoughts);
    // console.log(`${seededReactions.length} reactions seeded successfully`);

    console.log('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1); // Exit the process with an error code
  }
});
