//Modelo de Libros
export interface Book {
    _id?: string,
    title?: string,
    edition?: string,
    year?: string, 
    authors?: string[],
    genres?: string[]
}