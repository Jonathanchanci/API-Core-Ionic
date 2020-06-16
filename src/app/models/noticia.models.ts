import { Autor } from './autor.models';

export interface Noticia{
    noticiaID: number,
    titulo: string,
    descripcion: string,
    contenido: string,
    fecha: Date,
    autorID: number,
    autor : Autor   
}