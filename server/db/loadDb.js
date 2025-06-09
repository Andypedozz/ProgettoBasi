const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Percorso al file .sql
const sqlFilePath = path.join(__dirname, 'INSERT-Queries.sql');

// Leggi il contenuto del file
const sql = fs.readFileSync(sqlFilePath, 'utf8');

// Connetti al DB
const db = new sqlite3.Database('./Project.db', (err) => {
  if (err) {
    return console.error('Errore apertura DB:', err.message);
  }
  console.log('Connesso al database.');
});

// Esegui tutte le query (può contenere più comandi separati da ;)
db.exec(sql, (err) => {
  if (err) {
    console.error('Errore esecuzione SQL:', err.message);
  } else {
    console.log('Query SQL eseguite correttamente.');
  }

  db.close((err) => {
    if (err) {
      return console.error('Errore chiusura DB:', err.message);
    }
    console.log('Connessione al DB chiusa.');
  });
});
