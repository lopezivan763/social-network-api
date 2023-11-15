const router = require("express").Router();

const {
  getThoughts,
  singleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsContoller");

//* /api/thoughts/
router.route("/").get(getThoughts).post(createThought);

//* /api/thoughts/:thoughtsId
router
  .route("/:thoughtsId")
  .get(singleThought)
  .put(updateThought)
  .delete(deleteThought);

//* /api/thoughts/:thoughtId/reactions
router.route("/:thoughtsId/reactions").post(createReaction);

  //* /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtsId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;
