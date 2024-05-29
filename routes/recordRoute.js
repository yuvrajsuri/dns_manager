const express = require('express');
const router = express.Router();
const recordController = require('../controller/RouteController.js');
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn} = require("../middleware.js");


router.get('/', recordController.getRecords);
router.post('/api/records', isLoggedIn, recordController.createRecord);
router.get("/api/records/:id/edit",isLoggedIn,wrapAsync(recordController.renderEditForm));
router.put('/records/:id', isLoggedIn,wrapAsync(recordController.updateRecord));
router.delete('/api/records/delete/:id', isLoggedIn,
wrapAsync(recordController.deleteRecord));

module.exports = router;
