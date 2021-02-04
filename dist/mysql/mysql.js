"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Patron singleton */
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.connected = false;
        console.log("clase inicializa para mysql");
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.connectDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    /** Recuperar todo el contenido */
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            callback(null, results);
        });
    }
    connectDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('Base de Datos en linea');
        });
    }
}
exports.default = MySQL;
