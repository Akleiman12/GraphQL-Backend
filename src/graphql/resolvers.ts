import { AuthorRepo, BookRepo, GenreRepo } from '../repositories'
import { Database } from '../database'
import { Author, Book, Genre } from "../models/library/index";

const db = new Database();

//Definicion de los resolvers para GraphQL
//Los resolvers son las funciones a realizar cuando se genera un query en graphql
//haciendo la conexion entre el modelo de graphql y el modelo de los datos
export const resolverMap = {
    Query: {
        //Queries de Author
        /////////////////////
        async author(obj, args, context, info): Promise<Author>{
            const repo = new AuthorRepo(db);
            return await repo.get(args.id)
        },
        async authors(obj, args, context, info): Promise<Author[]>{
            const repo = new AuthorRepo(db);
            return await repo.getAll()
        },
        /////////////////////
        //Queries de Books
        /////////////////////
        async book(obj, args, context, info): Promise<Book>{
            const repo = new BookRepo(db);
            return await repo.get(args.id)
        },
        async books(obj, args, context, info): Promise<Book[]>{
            const repo = new BookRepo(db);
            return await repo.getAll()
        },
        /////////////////////
        //Queries de Genres
        /////////////////////
        async genre(obj, args, context, info): Promise<Genre>{
            const repo = new GenreRepo(db);
            return await repo.get(args.id)
        },
        async genres(obj, args, context, info): Promise<Genre[]>{
            const repo = new GenreRepo(db);
            return await repo.getAll()
        }
        /////////////////////
        
    },
    Mutation: {
        //Mutations de Author
        /////////////////////
        async createAuthor(obj, args, context, info): Promise<Author>{
            const repo = new AuthorRepo(db);
            return await repo.create(args.input);
        },
        async updateAuthor(obj, args, context, info): Promise<Author>{
            const repo = new AuthorRepo(db);
            return await repo.update(args.id, args.input);
        },
        async removeAuthor(obj, args, context, info): Promise<Author>{
            const repo = new AuthorRepo(db);
            return await repo.create(args.id);
        },
        /////////////////////
        //Mutations de Books
        /////////////////////
        async createBook(obj, args, context, info): Promise<Book>{
            const repo = new BookRepo(db);
            return await repo.create(args.input);
        },
        async updateBook(obj, args, context, info): Promise<Book>{
            const repo = new BookRepo(db);
            return await repo.update(args.id, args.input);
        },
        async removeBook(obj, args, context, info): Promise<Book>{
            const repo = new BookRepo(db);
            return await repo.create(args.id);
        },
        /////////////////////
        //Mutations de Genre
        /////////////////////
        async createGenre(obj, args, context, info): Promise<Genre>{
            const repo = new GenreRepo(db);
            return await repo.create(args.input);
        },
        async updateGenre(obj, args, context, info): Promise<Genre>{
            const repo = new GenreRepo(db);
            return await repo.update(args.id, args.input);
        },
        async removeGenre(obj, args, context, info): Promise<Genre>{
            const repo = new GenreRepo(db);
            return await repo.create(args.id);
        },
        /////////////////////
    },
    Author: {
        async books(obj, args, context, info): Promise<Book[]>{
            const repo = new BookRepo(db);
            return await repo.getArray(obj.books)
        },
        async genres(obj, args, context, info): Promise<Genre[]>{
            const repo = new GenreRepo(db);
            return await repo.getArray(obj.genres)
        },
    },
    Book: {
        async authors(obj, args, context, info): Promise<Author[]>{
            const repo = new AuthorRepo(db);
            return await repo.getArray(obj.authors)
        },
        async genres(obj, args, context, info): Promise<Genre[]>{
            const repo = new GenreRepo(db);
            return await repo.getArray(obj.genres)
        }
    },
    Genre: {
        async authors(obj, args, context, info): Promise<Author[]>{
            const repo = new AuthorRepo(db);
            return await repo.getArray(obj.authors)
        },
        async books(obj, args, context, info): Promise<Book[]>{
            const repo = new BookRepo(db);
            return await repo.getArray(obj.books)
        },
    }

}