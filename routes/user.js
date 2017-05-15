const express = require('express');
// Módulo user:
const userCtrl = require('../src/user/controller');

// Instancia del Router de express:
const userRouter = express.Router();

/* ENDPOINTS */

// GET Users:
userRouter.get('/', userCtrl.getAllUsers);
// GET an user:
//userRouter.get('/:slug');
// POST User:
//userRouter.post('/',);
// Update User:
//userRouter.put('/:slug',);
// Delete User:
//userRouter.delete('/:slug',);

module.exports = userRouter;
