
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

let config_key_name = "config";

@Injectable()
export class ConfigProvider {
  private config = {
    showSlide: false,
    name: "",
    userName: ""
  }
  constructor(public http: Http) {

  }

  getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  setConfigData(showSlide?: boolean, name?: string, userName?: string) {
    let config = {
      showSlide: false,
      name: "",
      userName: ""
    };

    if (showSlide) {
      config.showSlide = showSlide;
    }

    if (name) {
      config.name = name;
    }

    if (userName) {
      config.userName = userName;
    }
    localStorage.setItem(config_key_name, JSON.stringify(config));
  }
}
