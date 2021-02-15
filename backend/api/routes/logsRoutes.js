const express = require('express');
const router = express.Router();


const logsController = require('../controllers/logsController');




router.get('/',  logsController.getAllLogs);
router.get('/agent/:ID', logsController.getAgentLogs);
router.get('/call/:number', logsController.getNumberLogs);


module.exports = router;