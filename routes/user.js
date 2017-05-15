const express = require('express');
// Módulo user:
const userCtrl = require('../src/user/controller');

// Instancia del Router de express:
const userRouter = express.Router();

/* ENDPOINTS */

// GET Users:
userRouter.get('/', userCtrl.getAllUsers);
// GET an user:
//userRouter.get('/:email', userCtrl.getUserBySlug);
// POST User:
userRouter.post('/', userCtrl.saveUser);
// Update User:
userRouter.put('/:userId', userCtrl.updateUser);
// Delete User:
userRouter.delete('/:userId', userCtrl.deleteUSer);
// Login:
userRouter.post('/login', userCtrl.canLogin);


module.exports = userRouter;
