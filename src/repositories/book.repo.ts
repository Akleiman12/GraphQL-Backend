import { Database } from '../database';
import { Book } from '../models/library';
import { ObjectId } from 'mongodb';


export class BookRepo {
    private db: Database;

    constructor(db: Database){
        this.db = db;
    }

    //Metodo para obtener un Book
    public async get(id: string): Promise <Book | null>{
        return this.db.Books.findOne({'_id': new ObjectId(id)});
    }

    //Metodo para obtener un Array de Books
    public async getArray(ids: string[]): Promise <Book[] | null>{
        let array = [];
        for(let i=0; i<ids.length; i++){
            array[i] = this.db.Books.findOne({'_id': new ObjectId(ids[i])});
        }
        return array;
    }

    //Metodo para obtener todos los Book
    public async getAll(): Promise <Book[] | null>{
        return this.db.Books.find().toArray();
    }

    //Metodo para crear un Book
    public async create(data: Book): Promise <Book | null>{
        let insertion = await this.db.Books.insertOne(data);
        if(insertion.insertedId){
            if(data.authors){
                for(let i=0; i<data.authors.length; i++){
                    this.insertInAuthor(data.authors[i],insertion.insertedId)
                }
            }
            if(data.genres){
                for(let i=0; i<data.genres.length; i++){
                    this.insertInGenre(data.genres[i],insertion.insertedId)
                }
            }
            return this.db.Books.findOne({'_id': new ObjectId(insertion.insertedId)});
        }
        else{
            return null;
        }
    }

    //Metodo para eliminar un Book
    public async remove(id: string): Promise<Book | null>{
        let found: Book = await this.db.Books.findOne({'_id': new ObjectId(id)});
        if (found._id){
            this.db.Books.deleteOne({'_id': new ObjectId(found._id)});
            return found;
        }
        else{
            return null;
        }
    }

    //Metodo para actualizar un Book
    public async update(id: string, data: Book): Promise<Book | null>{
        let updated = await this.db.Books.updateOne({'_id': new ObjectId(id)}, { $set: data });
        if(updated.matchedCount === 1){
            return this.db.Books.findOne({'_id': new ObjectId(id)});
        }
        else{
            return null
        }
    }

    //Metodo para actualizar el Genre asociado a un Book creado
    public async insertInGenre(idGenre: string, idBook: ObjectId){
        let genre = await this.db.Genres.findOne({'_id': new ObjectId(idGenre)});
        if(!genre.books){
            let books = [idBook.toString()];
            genre.books = books;
        }else{
            genre.books.push(idBook.toString());
        }
        await this.db.Genres.updateOne({'_id': new ObjectId(idGenre)}, {$set: genre})
    }

    //Metodo para actualizar el Author asociado a un Book creado
    public async insertInAuthor(idAuthor: string, idBook: ObjectId){
        let author = await this.db.Authors.findOne({'_id': new ObjectId(idAuthor)});
        if(!author.books){
            let books = [idBook.toString()];
            author.books = books;
        }else{
            author.books.push(idBook.toString());
        }
        await this.db.Authors.updateOne({'_id': new ObjectId(idAuthor)}, {$set: author})
    }


}



