import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from 'src/app/models/noticia.models';
import { Autor } from 'src/app/models/autor.models';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private url: string= "https://localhost:44384/api/";
  constructor(public http: HttpClient) { }

  verNoticias() : Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.url + "noticias/obtener");
  }

  eliminarNoticia(noticiaId) : Observable<boolean>{
    return this.http.delete<boolean>(this.url + "noticias/eliminar/" + noticiaId);
  }

  listadoAutores() : Observable<Autor[]>{
    return this.http.get<Autor[]>(this.url + "autores");
  }

  agregarNoticia(noticia: Noticia) : Observable<boolean>{
    return this.http.post<boolean>(this.url + "noticias/agregar",noticia);
  }
}
