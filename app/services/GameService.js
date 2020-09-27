const Sequelize = require('sequelize');
const Moves = require('@app/models').Moves;
const { generateToken, generateMatrix, compareValues } = require('@app/utils/helpers');

const ApplicationError = require('@app/errors/ApplicationError');

class GameService {
  constructor() { }

  async createGame(inputs){
    const userToken = generateToken();
    return { 
      message: 'READY', 
      userToken,
    };
  }

  async getAllMoves(inputs){
    const allMoves = await Moves.findAll({
      where: {
        userToken: inputs.userToken
      }
    });

    return allMoves;
  }

  async play(inputs) {
    const allMoves = await Moves.findAll({
      where: {
        userToken: inputs.userToken
      },
      order: [['id', 'DESC']]
    });

    const lastTurn = allMoves[0];
    let lastTurnOnColumn = null;
    let matrix = generateMatrix(6, 7, 0);
    
    allMoves.forEach(singleMove => {
      matrix[singleMove.row][singleMove.column] = singleMove.turn === 'yellow' ? 1 : 2;
      if(!lastTurnOnColumn && singleMove.column === Number(inputs.instruction)){
        lastTurnOnColumn = singleMove;
      }
    });

    if(lastTurnOnColumn && lastTurnOnColumn.row === 5){
      throw new ApplicationError('INVALID');
    }

    if (lastTurn && lastTurn.status !== 'in progress') {
      return { message: lastTurn.status , userToken: inputs.userToken };
    }

    matrix[lastTurnOnColumn ? lastTurnOnColumn.row + 1 : 0][inputs.instruction] = lastTurn && lastTurn.turn === 'yellow' ? 2 : 1;
    const checkWinner = await this.checkWinnerFromMatrix(matrix);
    const insertedMove = await Moves.create({
      usertoken: inputs.userToken,
      column: inputs.instruction,
      row: lastTurnOnColumn ? lastTurnOnColumn.row + 1 : 0,
      turn: lastTurn && lastTurn.turn === 'yellow' ? 'red' : 'yellow',
      status: checkWinner === 0 ? 'in progress' : (checkWinner === 1 ? 'Yellow Wins' : 'Red Wins')
    })
    
    return { message: checkWinner === 0 ? 'VALID' : (checkWinner === 1 ? 'Yellow Wins' : 'Red Wins') , userToken: inputs.userToken };
  }

  async checkWinnerFromMatrix(matrix){
    console.log(matrix);

    // Check down
    let r, c;
    for (r = 0; r < 3; r++)
        for (c = 0; c < 7; c++)
            if (compareValues(matrix[r][c], matrix[r+1][c], matrix[r+2][c], matrix[r+3][c]))
                return matrix[r][c];

    // Check right
    for (r = 0; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (compareValues(matrix[r][c], matrix[r][c+1], matrix[r][c+2], matrix[r][c+3]))
                return matrix[r][c];

    // Check down-right
    for (r = 0; r < 3; r++)
        for (c = 0; c < 4; c++)
            if (compareValues(matrix[r][c], matrix[r+1][c+1], matrix[r+2][c+2], matrix[r+3][c+3]))
                return matrix[r][c];

    // Check down-left
    for (r = 3; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (compareValues(matrix[r][c], matrix[r-1][c+1], matrix[r-2][c+2], matrix[r-3][c+3]))
                return matrix[r][c];

    return 0;
  }
}

module.exports = GameService;
