const db = require('../util/database');

module.exports = class User {
    constructor(username, password, name) {
        this.username = username;
        this.password = password;
        this.name = name;
    }

    async save() {
        try {
            const [result] = await db.execute(
                'INSERT INTO usuarios (username, password, name) VALUES (?, ?, ?)',
                [this.username, this.password, this.name]
            );
            this.id = result.insertId;
            return this;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to register user');
        }
    }

    static async findByUsername(username) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM usuarios WHERE username = ?',
                [username]
            );
            return rows[0]; 
        } catch (error) {
            console.log(error);
            throw new Error(`Failed to find user with username ${username}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM usuarios WHERE id = ?',
                [id]
            );
            return rows[0]; 
        } catch (error) {
            console.log(error);
            throw new Error(`Failed to find user with id ${id}`);
        }
    }

    static async validateCredentials(username, password) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM usuarios WHERE username = ? AND password = ?',
                [username, password]
            );
            return rows[0]; 
        } catch (error) {
            console.log(error);
            throw new Error('Failed to validate credentials');
        }
    }
}