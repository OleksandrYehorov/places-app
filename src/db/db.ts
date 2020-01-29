import { openDatabase } from 'expo-sqlite';

const db = openDatabase('places.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE places;');
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id        INTEGER PRIMARY KEY NOT NULL,
          title     TEXT NOT NULL,
          imageUri  TEXT NOT NULL,
          address   TEXT NOT NULL,
          latitude  REAL NOT NULL,
          longitude REAL NOT NULL
        );`,
        [],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const insertPlace = (
  title: string,
  imageUri: string,
  address: string,
  latitude: number,
  longitude: number,
) => {
  return new Promise<SQLResultSet>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO places (
          title,
          imageUri,
          address,
          latitude,
          longitude
        )
        VALUES (?, ?, ?, ?, ?);`,
        [title, imageUri, address, latitude, longitude],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const fetchPlaces = () => {
  return new Promise<SQLResultSet>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM places;`,
        [],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};
