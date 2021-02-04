/* Patron singleton */
import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    cnn: mysql.Connection;
    connected: boolean = false;

    constructor() {
        console.log("clase inicializa para mysql");

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        })

        this.connectDB();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() )
    }

    /** Recuperar todo el contenido */
    static ejecutarQuery( query: string, callback: Function) {
        this.instance.cnn.query(query, (err, results: Object[], fields: Object) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err) ;
            }

            if (results.length === 0) {
                callback('El registro solicitado no existe')
            }

            callback(null, results);
        })
    }

    private connectDB() {
        this.cnn.connect(( err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }

            this.connected = true;
            console.log('Base de Datos en linea');
            
        })
    }


}