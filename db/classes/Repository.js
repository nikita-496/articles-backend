const db = require('../db');

class Repository {
  static async save(table, columns, values) {
    const saved = await db.query(
      `INSERT INTO ${table} (${columns}) values (${Helper.setValueID(
        Helper.convertValuesToArray(values)
      )}) RETURNING *`,
      Helper.convertValuesToArray(values)
    );
    return saved.rows[0];
  }

  static async getAll(table, res) {
    const result = await db.query('SELECT * FROM ' + table);
    res.json(result.rows)
  }
}

class Helper {
  static setValueID(values) {
    let result = '';
    let i = 1;
    const length = values.length;

    while (i <= length) {
      if (i === length) {
        result = result.concat(`$${i}`);
        break;
      }
      result = result.concat(`$${i},`);
      i++;
    }
    return result;
  }
  static convertValuesToArray(values) {
    return Object.values(values);
  }
}

module.exports = { Repository, Helper };
