import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3";
  private keypass = "a0cf0cebfebc3a753c8a9cd8f72acf68";
  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }
  getLatestMovies(page = 1) {
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=`+this.keypass);
  }

  getMovieDetail(filmeid) {
    return this.http.get(this.baseApiPath + `/movie/${filmeid}?api_key=`+ this.keypass);
  }
}
