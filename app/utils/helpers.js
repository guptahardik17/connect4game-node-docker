const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  /**
   * loads a specific key from .env
   * if not found, return the defaulValue
   */
  env: function(key, defaultValue) {
    const value = process.env[key];

    if (value) {
      return value;
    }

    return defaultValue;
  },

  generateToken: () => {
    return Math.random().toString(36).split('').filter( function(value, index, self) { 
        return self.indexOf(value) === index;
    }).join('').substr(2,8) + '|' +String(+ new Date());
  },

  generateMatrix: (rows, columns, fillValue) => {
    return Array(rows).fill(fillValue).map(()=>Array(columns).fill(fillValue));
  },

  compareValues(a,b,c,d) {
    return ((a != 0) && (a ==b) && (a == c) && (a == d));
  }

};
