import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias/noticias.service';
import { Noticia } from '../models/noticia.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.page.html',
  styleUrls: ['./listado-noticias.page.scss'],
})
export class ListadoNoticiasPage implements OnInit {

  public noticias: Noticia[];
  constructor(private noticiasService: NoticiasService, private router: Router) { }

  ngOnInit() {
    this.noticiasService.verNoticias().subscribe((noticia)=>{
      this.noticias = noticia;

    },(error)=>{
      console.log(error);      
    })
  }

  detalle(noticia: Noticia){
    this.router.navigate(["noticia-detalle", {noticia : JSON.stringify(noticia)}]);
  }
}
