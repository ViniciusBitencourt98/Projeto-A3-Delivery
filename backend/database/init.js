// Inicializa o banco de dados SQLite com o schema e os dados iniciais

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database('./database.sqlite');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql')).toString();
const seed = fs.readFileSync(path.join(__dirname, 'seed.sql')).toString();

db.serialize(() => {
  db.exec(schema, (err) => {
    if (err) console.error('Erro no schema:', err);
    else {
      console.log('Schema criado com sucesso.');
      db.exec(seed, (err2) => {
        if (err2) console.error('Erro no seed:', err2);
        else console.log('Dados iniciais inseridos.');
      });
    }
  });
});
