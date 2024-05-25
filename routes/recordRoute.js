const express = require('express');
const router = express.Router();
const recordController = require('../controller/RouteController.js');
const wrapAsync = require("../utils/wrapAsync.js");


router.get('/', recordController.getRecords);
router.post('/api/records', recordController.createRecord);
router.get("/api/records/:id/edit",wrapAsync(recordController.renderEditForm));
router.put('/records/:id', wrapAsync(recordController.updateRecord));
router.delete('/api/records/delete/:id', 
wrapAsync(recordController.deleteRecord));

module.exports = router;
