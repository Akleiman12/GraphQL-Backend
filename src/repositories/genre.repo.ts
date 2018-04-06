import { Database } from '../database';
import { Genre } from '../models/library';
import { ObjectId } from 'mongodb';
import { BookRepo, AuthorRepo } from './'

export class GenreRepo {
    private db: Database;

    constructor(db: Database){
        this.db = db;
    }

    //Metodo para obtener un Genre
    public async get(id: string): Promise <Genre | null>{
        return this.db.Genres.findOne({'_id': new ObjectId(id)});
    }

    //Metodo para obtener un Array de Genres
    public async getArray(ids: string[]): Promise <Genre[] | null>{
        let array = [];
        for(let i=0; i<ids.length; i++){
            array[i] = this.db.Genres.findOne({'_id': new ObjectId(ids[i])});
        }
        return array;
    }

    //Metodo para obtener todos los Genres
    public async getAll(): Promise <Genre[] | null>{
        return this.db.Genres.find().toArray();
    }

    //Metodo para crear un Genre
    public async create(data: Genre): Promise <Genre | null>{
        let insertion = await this.db.Genres.insertOne(data);
        if(insertion.insertedId){
            if(data.authors){
                for(let i=0; i<data.authors.length; i++){
                    this.insertInAuthor(data.authors[i],insertion.insertedId)
                }
            }
            if(data.books){
                for(let i=0; i<data.books.length; i++){
                    this.insertInBook(data.books[i],insertion.insertedId)
                }
            }
            return this.db.Genres.findOne({'_id': new ObjectId(insertion.insertedId)});
        }
        else{
            return null;
        }
    }

    //Metodo para eliminar un Genre
    public async remove(id: string): Promise<Genre | null>{
        let found = await this.db.Genres.findOne({'_id': new ObjectId(id)});
        if (found._id){
            this.db.Genres.deleteOne({'_id': new ObjectId(found._id)});
            return found;
        }
        else{
            return null;
        }
    }

    //Metodo para actualizar un Genre
    public async update(id: string, data: Genre): Promise<Genre | null>{
        let updated = await this.db.Genres.updateOne({'_id': new ObjectId(id)}, { $set: data });
        if(updated.matchedCount === 1){
            return this.db.Genres.findOne({'_id': new ObjectId(id)});
        }
        else{
            return null
        }
    }

    //Metodo para actualizar el Book asociado a un Genre creado
    public async insertInBook(idBook: string, idGenre: ObjectId){
        let book = await this.db.Books.findOne({'_id': new ObjectId(idBook)});
        if(!book.genres){
            let genres = [idGenre.toString()];
            book.genres = genres;
        }else{
            book.genres.push(idGenre.toString());
        }
        await this.db.Books.updateOne({'_id': new ObjectId(idBook)}, {$set: book})
    }

    //Metodo para actualizar el Author asociado a un Genre creado
    public async insertInAuthor(idAuthor: string, idGenre: ObjectId){
        let author = await this.db.Authors.findOne({'_id': new ObjectId(idAuthor)});
        if(!author.genres){
            let genres = [idGenre.toString()];
            author.genres = genres;
        }else{
            author.genres.push(idGenre.toString());
        }
        let result = await this.db.Authors.updateOne({'_id': new ObjectId(idAuthor)}, {$set: author})
    }


}

