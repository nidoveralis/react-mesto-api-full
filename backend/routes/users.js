const router = require('express').Router();
const {
  getUser, getUserMe, getUserById, editUser, editAvatar,
} = require('../controllers/users');
const { validationEditUser, validationEditAvatar, validationUserId } = require('../validation/validation');

router.get('/', getUser);
router.get('/me', getUserMe);
router.get('/:userId', validationUserId, getUserById);
router.patch('/me', validationEditUser, editUser);
router.patch('/me/avatar', validationEditAvatar, editAvatar);

module.exports = router; 
