import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from './models/usuarios';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs/internal/Observable';
import { User } from './models/user';
import { isNullOrUndefined } from 'util';
import { UserData } from './models/userData';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  //Conexión a API-HUBRE de ejemplo en heroku//
  api_GEDI_url = 'http://localhost:3000/server';
  constructor(private http: HttpClient) { }

  getInstitutos() {
    return this.http.get(this.api_GEDI_url + '/leerInstitutos');
  }

  getCarreras() {
    return this.http.get(this.api_GEDI_url + '/leerCarreras');
  }

  getRoles() {
    return this.http.get(this.api_GEDI_url + '/leerRoles');
  }

  getUsers() {
    //return this.http.get(this.api_url);
    return this.http.get(this.api_GEDI_url + '/leerUsuarios');
  }
  getDocentes() {
    //return this.http.get(this.api_url);
    return this.http.get(this.api_GEDI_url + '/leerDocentes');
  }
  getCarrerasxUsuario(){
    return this.http.get(this.api_GEDI_url + '/leerCarrerasxUsuario')
  }
  loginUser(user: User) {
    return this.http.post(this.api_GEDI_url + '/login', user);
  }
  findById(user: UserData){
    return this.http.post(this.api_GEDI_url + '/findById', user);
  }
  updateUser(user: UserData){
    return this.http.post(this.api_GEDI_url + '/updateById', user);
  }
  getDocumentos(){
    return this.http.get(this.api_GEDI_url + '/getDocumentos');
  }
  //For Logged auth user
  setUser(user: User): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
    //console.log('setUsuario:_',usuario);
    //return this.http.post(this.api_GEDI_url+'/registro',usuario);    
  }
  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }
  getToken() {
    return localStorage.getItem("accessToken");
  }
  getCurrentUser(): User {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: User = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }
  logoutUser(): void {
    let accessToken = localStorage.getItem("accessToken");
    //const url_api = `http://localhost:3000/api/Users/logout?access_token=${accessToken}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    //return this.htttp.post<UserInterface>(url_api, { headers: this.headers });
  }

}
