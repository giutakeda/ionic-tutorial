import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {
  public objeto_feed = {
    titulo: "Giuliano S. Takeda",
    data: "07 de dezembro de 2017",
    descricao: "Muito bom esse aplicativo!!!",
    nomeUsuario: "Giuliano Shintarow Takeda",
    qntd_likes: 9999,
    qntd_comments: 8247832,
    time_comments: "13th dec"
  }

  public lista_filmes = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public nomeUsuario: string = "Enzo Takeda";
  public page = 1;
  public infiniteScroll;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private moovieProvider: MoovieProvider,
    public loadingCtrl: LoadingController) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1: number, num2: number): void {
    alert(num1 + num2);
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }


  public carregarFilmes(newpage: boolean = false) {
    this.abreCarregando();
    this.moovieProvider.getLatestMovies(this.page).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

        if (newpage){
          this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
          this.infiniteScroll.complete();
        }else{
          this.lista_filmes = objeto_retorno.results;
        }

        console.log(objeto_retorno);
        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error)
        this.fechaCarregando();
      }
    )
  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push('FilmeDetalhePage', { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);

    // console.log('Begin async operation');

    // setTimeout(() => {
    //   for (let i = 0; i < 30; i++) {
    //     this.items.push(this.items.length);
    //   }

    //   console.log('Async operation has ended');
    //   infiniteScroll.complete();
    // }, 500);
  }
}