const GameService = require('@app/services/GameService');
const gameService = new GameService();

const MovesTransformer = require('@app/transformers/MovesTransformer');

class IndexController {
    constructor() {
  
    }
  
    async playGame(req, res, next) {
        const inputs = {
            ...req.body,
        };
        
        let response = {};
        
        if(inputs.instruction && typeof inputs.instruction === 'string' && inputs.instruction.toUpperCase() === 'START'){
            response = await gameService.createGame(inputs);
            return res.success(response);
        } else if(inputs.instruction && inputs.userToken && typeof inputs.instruction === 'number' && 0 <= inputs.instruction && inputs.instruction <= 6 ){
            response = await gameService.play(inputs);
            return res.success(response);
        } else {
            response = { status: 422, message: 'MISSING PARAMETERS OR INVALID VALUES' };
            return res.error(response, 422);
        }
    }

    async fetchMoves(req, res, next) {
        const inputs = {
            ...req.query,
        };

        let response = {};

        if(!inputs.userToken){
            response = { status: 422, message: 'MISSING PARAMETER - pass userToken as query parameter' };
            return res.error(response, 422);
        } else if(inputs.userToken && inputs.userToken.length >= 20 && inputs.userToken.length <= 22){
            response = await gameService.getAllMoves(inputs);
            return res.transformItems(MovesTransformer, response);
        } else {
            response = { status: 422, message: 'INVALID PARAMETER VALUE - userToken' };
            return res.error(response, 422);
        }
        
    }
    
  }
  
  module.exports = new IndexController;
  