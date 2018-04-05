//Definicion del Schema para GraphQL
//El Schema es el esquema de graphql para que el sistema pueda
//entender las peticiones que se hacen y lo que debe hacer
export const sch = `

    type Query{
        author(id: String): Author
        authors: [Author]
        book(id: String): Book
        books: [Book]
        genre(id: String): Genre
        genres: [Genre]
    }

    type Mutation{
        createAuthor(input: AuthorInput): Author
        updateAuthor(id: String, input: AuthorInput): Author
        removeAuthor(id: String): Author
        createBook(input: BookInput): Book
        updateBook(id: String, input: BookInput): Book
        removeBook(id: String): Book
        createGenre(input: GenreInput): Genre
        updateGenre(id: String, input: GenreInput): Genre
        removeGenre(id: String): Genre
    }

    type Author{
        _id: String
        given_name: String
        middle_name: String
        last_name: String
        birth_date: String
        birth_place: String
        death_date: String
        death_place: String
        age: Int
        books: [Book]
        genres: [Genre]
    }

    input AuthorInput {
        given_name: String
        middle_name: String
        last_name: String
        birth_date: String
        birth_place: String 
        death_date: String
        death_place: String 
        age: Int
        books: [String]
        genre: [String]
    }

    type Book {
        id: String
        title: String
        edition: String
        year: String 
        authors: [Author]
        genres: [Genre]
    }

    input BookInput {
        id: String
        title: String
        edition: String
        year: String 
        authors: [String]
        genres: [String]
    }

    type Genre {
        id: String
        title: String
        authors: [Author]
        books: [Book]
    }

    input GenreInput {
        id: String
        title: String
        authors: [String]
        books: [String]
    }

`