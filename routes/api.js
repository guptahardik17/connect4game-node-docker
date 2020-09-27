const express = require('express');
const asyncHandler = require('express-async-handler');


const indexController = require('@app/http/controllers/api/indexController');
const gameController = require('@app/http/controllers/api/gameController');

const router = express.Router();

router.get('/', [], asyncHandler(indexController.index));

router.post('/play', [], asyncHandler(gameController.playGame));
router.get('/moves', [], asyncHandler(gameController.fetchMoves));

module.exports = router;
