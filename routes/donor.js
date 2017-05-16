const express = require('express');
// Módulo user:
const donorCtrl = require('../src/donor/controller');

// Instancia del Router de express:
const donorRouter = express.Router();

/* ENDPOINTS */

// GET all donors:
donorRouter.get('/', donorCtrl.getAllDonors);

// POST
donorRouter.post('/', donorCtrl.saveDonor);

// PUT
donorRouter.put('/:donorId', donorCtrl.updateDonor);

// DELETE
donorRouter.delete('/:donorId', donorCtrl.deleteDonor);

// GET excel:
donorRouter.get('/orderedDonors', donorCtrl.getOrderedExcel)

module.exports = donorRouter;
