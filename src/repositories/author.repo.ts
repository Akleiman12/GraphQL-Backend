import { Database } from '../database';
import { Author } from '../models/library';
import { ObjectId } from 'mongodb';

export class AuthorRepo {
    private db: Database;

    constructor(db: Database){
        this.db = db;
    }

    //Metodo para obtener un Author
    public async get(id: string): Promise <Author | null>{
        return this.db.Authors.findOne({'_id': new ObjectId(id)});
    }

    //Metodo para obtener un Array de Authors
    public async getArray(ids: string[]): Promise <Author[] | null>{
        let array = [];
        for(let i=0; i<ids.length; i++){
            array[i] = this.db.Authors.findOne({'_id': new ObjectId(ids[i])});
        }
        return array;
    }

    //Metodo para obtener todos los Authors
    public async getAll(): Promise <Author[] | null>{
        console.log('Entered Repo')
        return this.db.Authors.find().toArray();
    }

    //Metodo para crear un Author
    public async create(data: Author): Promise <Author | null>{
        let insertion = await this.db.Authors.insertOne(data);
        if(insertion.insertedId){
            if(data.genres){
                for(let i=0; i<data.genres.length; i++){
                    this.insertInGenre(data.genres[i],insertion.insertedId)
                }
            }
            if(data.books){
                for(let i=0; i<data.books.length; i++){
                    this.insertInBook(data.books[i],insertion.insertedId)
                }
            }
            return this.db.Authors.findOne({'_id': new ObjectId(insertion.insertedId)});
        }
        else{
            return null;
        }
    }

    //Metodo para eliminar un Author
    public async remove(id: string): Promise<Author | null>{
        let found = await this.db.Authors.findOne({'_id': new ObjectId(id)});
        if (found._id){
            this.db.Authors.deleteOne({'_id': new ObjectId(found._id)});
            return found;
        }
        else{
            return null;
        }
    }

    //Metodo para actualizar un Author
    public async update(id: string, data: Author): Promise<Author | null>{
        let updated = await this.db.Authors.updateOne({'_id': new ObjectId(id)}, { $set: data });
        if(updated.matchedCount === 1){
            return this.db.Authors.findOne({'_id': new ObjectId(id)});
        }
        else{
            return null
        }
    }

    //Metodo para actualizar el Book asociado a un Author creado
    public async insertInBook(idBook: string, idAuthor: ObjectId){
        let book = await this.db.Books.findOne({'_id': new ObjectId(idBook)});
        if(!book.authors){
            let authors = [idAuthor.toString()]
            book.authors = authors
        }else{
            book.authors.push(idAuthor.toString());
        }
        await this.db.Books.updateOne({'_id': new ObjectId(idBook)}, {$set: book})
    }

    //Metodo para actualizar el Genre asociado a un Author creado
    public async insertInGenre(idGenre: string, idAuthor: ObjectId){
        let genre = await this.db.Genres.findOne({'_id': new ObjectId(idGenre)});
        if(!genre.authors){
            let authors = [idAuthor.toString()]
            genre.authors = authors
        }else{
            genre.authors.push(idAuthor.toString());
        }
        await this.db.Genres.updateOne({'_id': new ObjectId(idGenre)}, {$set: genre})
    }
}