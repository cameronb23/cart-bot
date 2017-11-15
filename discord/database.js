// TODO: start databases
import { Database, Model } from 'mongorito';

let db;

class User extends Model {}
class Cart extends Model {}

export async function initDb() {
  db = new Database(process.env.MONGO_URL || 'localhost/cartbot');

  await db.connect();

  db.register(User);
  db.register(Cart);
}
