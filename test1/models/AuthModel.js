import Database from 'better-sqlite3';

const db = new Database('./database/database.sqlite');

class Auth {
    constructor(db) {
      this.db = db;
    }
  
    getUserByUsername(username) {
      return this.db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    }
  
    createUser(username, hashedPassword) {
      return this.db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashedPassword);
    }
  }
  
  export default Auth;
  