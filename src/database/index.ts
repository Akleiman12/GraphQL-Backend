import {
    Author,
    Book,
    Genre
} from '../models/library';
import { Collection, MongoClient, Db } from 'mongodb';


//Aqui se construlle la conexion a la BDD (en este caso MongoDB) para ser declara al iniciar la app
export class Database {

    mongo: Db
    Authors: Collection<Author>
    Books: Collection<Book>
    Genres: Collection<Genre>

    constructor(){
        this.connectMongo();
    }

    async connectMongo(): Promise<any>{
        const mc = await MongoClient.connect('mongodb://localhost:27017/library');
        this.mongo = mc.db('library');
        this.Authors = this.mongo.collection<Author>('authors');
        this.Books = this.mongo.collection<Book>('books');
        this.Genres = this.mongo.collection<Genre>('genres');
    }
}