const profileRouter = require('express').Router();
const profileController = require('../controller/profile');

profileRouter
  .route('/')
  .get(profileController.handleAllProfile)
  .post(profileController.handleNewProfile)

profileRouter
  .route('/:id')
  .get(profileController.handleOneProfile)

module.exports = profileRouter;