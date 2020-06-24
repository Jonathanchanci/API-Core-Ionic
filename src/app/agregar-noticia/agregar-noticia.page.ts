import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias/noticias.service';
import { Autor } from '../models/autor.models';
import { Noticia } from '../models/noticia.models';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-noticia',
  templateUrl: './agregar-noticia.page.html',
  styleUrls: ['./agregar-noticia.page.scss'],
})
export class AgregarNoticiaPage implements OnInit {
  public listadoAutores : Autor[];
  public noticia : Noticia = new Noticia();
  constructor(private noticiaService: NoticiasService
    ,public toastController: ToastController
    ,public loadingController: LoadingController ) { }

  ngOnInit() {
    this.noticiaService.listadoAutores().subscribe((autores)=>{
      this.listadoAutores = autores;
    });
  }

  async guardar(){
    const loading = await this.loadingController.create({
      message: 'Guardando',
    });
    await loading.present();

    this.noticiaService.agregarNoticia(this.noticia).subscribe(()=>{
      this.presentToast("Noticia guradada con éxito");
      this.noticia = new Noticia();
      loading.dismiss();
    },
    error=>{
      this.presentToast("Error al guardar la noticia");
      loading.dismiss();
      console.error(error);      
    });
    
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
