import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../models/noticia.models';

@Component({
  selector: 'app-noticia-detalle',
  templateUrl: './noticia-detalle.page.html',
  styleUrls: ['./noticia-detalle.page.scss'],
})
export class NoticiaDetallePage implements OnInit {
  public noticia: Noticia;
  constructor(private state: ActivatedRoute) { }

  ngOnInit() {
    this.noticia = JSON.parse(this.state.snapshot.params.noticia);
  }

}
