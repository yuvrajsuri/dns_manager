const express = require('express');
const router = express.Router();
const recordController = require('../controller/RouteController.js');

router.get('/', recordController.getRecords);
router.post('/api/records', recordController.createRecord);
router.post('/api/records/delete/:id', recordController.deleteRecord);

module.exports = router;
