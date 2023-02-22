import { openDB } from 'idb';

const DB_NAME = 'jate';
const STORE_NAME = 'jate';
const ITEM_KEY = 1;

async function initDb() {
  // Create or upgrade the database if needed
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    }
  });
  console.log('Database initialized');
}

async function putDb(content) {
  // Write the content to the database
  const db = await openDB(DB_NAME, 1);
  await db.put(STORE_NAME, { id: ITEM_KEY, value: content });
  console.log('Data saved to database');
}

async function getDb() {
  // Read the content from the database
  const db = await openDB(DB_NAME, 1);
  const result = await db.get(STORE_NAME, ITEM_KEY);
  if (result) {
    console.log('Data retrieved from the database', result.value);
  } else {
    console.log('Data not found in the database');
  }
}

initDb();

export { putDb, getDb };

