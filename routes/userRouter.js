const express = require('express');

const { login, protect } = require('./../controllers/authController');
const {
  addClient,
  addUser,
  getClient,
  getMe,
  updateClient,
  deleteClients,
} = require('./../controllers/userController');

const router = express.Router();

router.post('/postUser', addUser);
router.post('/login', login);
router.use(protect);
router.get('/getClient/:uuid', getClient);
router.post('/postClient/:uuid', addClient);
router.get('/getMe/:uuid', getMe);
router.delete('/deleteClient/:uuid', deleteClients);
router.patch('/updateClient/:uuid', updateClient);

module.exports = router;
