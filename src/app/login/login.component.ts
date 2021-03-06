import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { User } from "../models/user";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'GEDI';
  mensajeBienvenida = 'Bienvenido a GEDI';
  formLogin : any;
  listaUsuarios = [];
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  url: string;
  constructor(private service: ServicioService,
    private formBuilder: FormBuilder,
    private router: Router) { }
public user: User = {
  correo: "",
  clave: ""
};

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      correo :'',
      clave:''
    });

    let data=this.service.getToken();
    if (data) {
          this.router.navigate(["/visualizador"]);
    }
    /* this.service.getUsers().subscribe(
      (getdatos:any[]) =>  this.listaUsuarios = getdatos ,
      (error: HttpErrorResponse) => { console.log(error.message)},
      ()=> console.log('peticion Finalizada',this.listaUsuarios)) */

  }


  login(){
   return this.service.loginUser(this.user)
   .subscribe(data => {
     this.service.setUser(data[0]);
     let token = data[0].id;
     this.service.setToken(token);
     console.log('postUsuario_:', data[0].id),
     this.router.navigate(["/visualizador"]);
     location.reload();
     },
     //this.navigateToLogin()
       error => {
        alert('Credenciales Incorrectas');
        //console.log('error_postUsuario_:', error)
       }
   );
  }
  
  ingresar(){
    this.service.getUsers();

    var correo = this.formLogin.correo
    var clave = this.formLogin.clave
    if(this.validarEmail(correo) === true  && this.validarInputs(clave) === true){
      var logUsuario = correo
      var logClave =  clave
      console.log(logClave +' y '+ logUsuario)

      console.log(this.listaUsuarios )
      
      var login = this.listaUsuarios.find(data=>
        data.correo === logUsuario && 
        data.clave === logClave)
        if(typeof login === "undefined"){
          alert('usuario o contraseña incorrectos')
        }else{
          alert('bienvenido')
          this.router.navigateByUrl('/home')
          this.formLogin.correo = ""
          this.formLogin.clave =""

          this.navegation();
        }
      
    }else{
      alert('usuario y/o contraseña incorrectas')
    }
  }

  navegation(){
    this.router.navigateByUrl('/visualizador')
  }

  validarEmail( email ) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }

  validarInputs(campo){
    if(campo !== ""){
      return true
    }else{
      return false
    }
  }
}
