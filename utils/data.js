const userData = 
[
    {
      "username": "john_doe",
      "email": "john@example.com",
      "thoughts": [],
      "friends": []
    },
    {
      "username": "jane_smith",
      "email": "jane@example.com",
      "thoughts": [],
      "friends": []
    },
    {
      "username": "alex_king",
      "email": "alex@example.com",
      "thoughts": [],
      "friends": []
    },
  ];

  const thoughtsData = 
  [
    {
      "thoughtText": "This is an interesting thought.",
      "username": "john_doe",
      "reactions": []
    },
    {
      "thoughtText": "I love coding!",
      "username": "jane_smith",
      "reactions": []
    },
    {
      "thoughtText": "Exploring new technologies is fun.",
      "username": "alex_king",
      "reactions": []
    },
  ];
  
  const reactionData = [
    {
      "reactionBody": "Wow!",
      "username": "john_doe"
    },
    {
      "reactionBody": "I agree!",
      "username": "jane_smith"
    },
    {
      "reactionBody": "Interesting!",
      "username": "alex_king"
    },
  ];
  
  module.exports = {userData, thoughtsData, reactionData};
  