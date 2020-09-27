const BaseTransformer = require('./BaseTransformer');

class MovesTransformer extends BaseTransformer {


  constructor(req, data) {
    const availableIncludes = ['usage'];
    super(req, data, availableIncludes);
  }

  /**
   * transformer user
   *
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  transform() {
    const move = this.data;
    
    return {
      id: move.id,
      column: move.column,
      row: move.row,
      turn: move.turn,
      status: move.status,
      createdAt: "2020-09-22T23:34:17.000Z"
    }
  }

  /**
   * ?include=?usage
   *
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  async includeUsage(user, req) {
    return this.transformItem({
      used: req.projects,
      total: req.projectsAllowed,
      remaining: req.projectsAllowed - req.projects
    });
  }

}

module.exports = MovesTransformer;
