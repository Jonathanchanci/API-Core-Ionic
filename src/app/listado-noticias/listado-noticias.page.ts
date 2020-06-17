import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias/noticias.service';
import { Noticia } from '../models/noticia.models';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.page.html',
  styleUrls: ['./listado-noticias.page.scss'],
})
export class ListadoNoticiasPage implements OnInit {

  public noticias: Noticia[];
  constructor(private noticiasService: NoticiasService
    , private router: Router
    ,public toastController: ToastController
    ,public alertController: AlertController) { }

  ngOnInit() {
    this.noticiasService.verNoticias().subscribe((noticia)=>{
      this.noticias = noticia;

    },(error)=>{
      console.log(error);      
    });
  }

  async presentAlertConfirm(noticiaid: number, indice: number,noticiaTitulo : string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Esta seguro!',
      message: 'Desea eliminar la noticia <strong>'+ noticiaTitulo +'</strong>!!!',
      buttons: [
        {
          text: 'Si',          
          cssClass: 'secondary',
          handler: (blah) => {
            this.eliminarNoticia(noticiaid,indice);
          }
        }, {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  detalle(noticia: Noticia){
    this.router.navigate(["noticia-detalle", {noticia : JSON.stringify(noticia)}]);
  }

  eliminarNoticia(noticiaid: number, indice: number){
    this.noticiasService.eliminarNoticia(noticiaid).subscribe(()=>{
      this.noticias.splice(indice,1);
      this.presentToast("Noticia eliminada con éxito");
    },error=>{
      console.error("Error al eliminar la noticia");      
    });
  }
}
