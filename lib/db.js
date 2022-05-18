"use strict";
import sql3 from "sqlite3";
const { Database, OPEN_READWRITE } = sql3;

// Verbose debugging
sql3.verbose();

export const getDB = () => {
  return new Promise((resolve, reject) => {
    let db = new Database("./mm.db", OPEN_READWRITE, async (err) => {
      if (err === null) {
        resolve(db);
        return;
      }
      // Else DB doesn't exist, or true error
      if (err && err.code == "SQLITE_CANTOPEN") {
        db = await createDatabase(); // TODO this was the problem. Need the db insance to be set to this one, with open: true.
        resolve(db);
      } else if (err) {
        reject(err); // TODO catch
      }
    });
  });
};

const createDatabase = () => {
  return new Promise((resolve, reject) => {
    let newdb = new Database("./mm.db", async (err) => {
      if (err) {
        reject(err);
      }
      await createTables(newdb);
      resolve(newdb);
    });
  });
};

const createTables = async (newdb) => {
  return new Promise((resolve, reject) => {
    newdb.run(
      `
      CREATE TABLE stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type VARCHAR(255) NOT NULL,
        sub_type VARCHAR(255),
        correct BOOLEAN NOT NULL,
        difficulty INT NOT NULL,
        start_time DATETIME NOT NULL,
        end_time DATETIME NOT NULL
      );
    `,
      [],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

export async function writeStat(data) {
  const db = await getDB();
  const params = {
    $type: data.type,
    $sub_type: data.sub_type,
    $correct: data.correct,
    $difficulty: data.difficulty,
    $start_time: data.start_time,
    $end_time: data.end_time,
  };
  await new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO stats (type, sub_type, correct, difficulty, start_time, end_time)
        VALUES ($type, $sub_type, $correct, $difficulty, $start_time, $end_time);`,
      params,
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}
