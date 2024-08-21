const mysql = require('mysql');

const dbConfig = {
  host: 'desafio-database',
  port: '3306',
  user: 'root',
  password: 'rootPass',
  database: 'desafio-full-cycle'
};

async function query(sql) {
  const conn = mysql.createConnection(dbConfig);

  const queryPromise = new Promise((resolve, reject) => {
    conn.query(sql, function (error, results) {
      if (error) reject(error);

      resolve(results)
    })
  })

  const queryResults = await queryPromise;

  conn.end();
  return queryResults;
}

const db = {
  query
}

module.exports = { db }