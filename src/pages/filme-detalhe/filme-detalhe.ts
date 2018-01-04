import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilmeDetalhePageModule } from './filme-detalhe.module';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { stringify } from '@angular/compiler/src/util';

/**
 * Generated class for the FilmeDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhe',
  templateUrl: 'filme-detalhe.html',
  providers: [
    MoovieProvider
  ]
})
export class FilmeDetalhePage {
  public filme;
  public filmeId;
  public detalheFilmeArr;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public moovieProvider: MoovieProvider
  ) {
  }

  ionViewDidEnter() {
    this.filmeId = this.navParams.get("id");
    console.log(this.filmeId);
    this.moovieProvider.getMovieDetail(this.filmeId).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.detalheFilmeArr = objeto_retorno;
        console.log(objeto_retorno);
      }, error => {
        console.log(error);
      }
    )

  }

}
