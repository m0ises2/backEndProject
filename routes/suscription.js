const express = require('express');
// Módulo user:
const suscriptionCtrl = require('../src/suscription/controller');

// Instancia del Router de express:
const suscripRouter = express.Router();

/* ENDPOINTS */

// GET all Suscriptions:
suscripRouter.get('/', suscriptionCtrl.getAllSuscriptions);

// POST
suscripRouter.post('/', suscriptionCtrl.saveSuscription);

// PUT
suscripRouter.put('/:suscriptionId', suscriptionCtrl.updateSuscription);

// DELETE
suscripRouter.delete('/:suscriptionId', suscriptionCtrl.deleteSuscription);

// GET excel:
suscripRouter.get('/orderedSuscriptions', suscriptionCtrl.getOrderedExcel)

module.exports = suscripRouter;
