const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/user.controller');

router.get('/', userCtrl.getUsers)
router.get('/user', userCtrl.VerifyUser);
//router.get('/:id', userCtrl.getUserById);
router.post('/register', userCtrl.signUp);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);


module.exports = router;