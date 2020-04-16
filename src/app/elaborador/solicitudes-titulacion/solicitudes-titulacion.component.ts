import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { SolicitudesTitulacion , Ing} from '../../models/solicitudes-titulacion';
import {FormBuilder} from '@angular/forms'
import {DatePipe} from '@angular/common'
import { ServicioService } from 'src/app/servicio.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import{User} from 'src/app/models/user'
import { UserData } from 'src/app/models/userData';
import { IfStmt } from '@angular/compiler';
import {ModalComponent} from '../../modal/modal.component'
pdfMake.vfs=pdfFonts.pdfMake.vfs
@Component({
  selector: 'app-solicitudes-titulacion',
  templateUrl: './solicitudes-titulacion.component.html',
  styleUrls: ['./solicitudes-titulacion.component.css']
})
export class SolicitudesTitulacionComponent implements OnInit {
  solicitud= new SolicitudesTitulacion();
  listaProf=[];
  date:any;
  fecha:any;
  dateS:any;
  fechaS:any;
  usuario:UserData;
  dialog: any;
  solicitudCodigoUsuario:string;
  codigoGet:string;
  numeroActual:number;
  numeroSiguiente:number;
  listaDocumentos:any[]=[];
  constructor(private formBuilder:FormBuilder,
    public datepipe:DatePipe,
    public service: ServicioService,
    public router: Router) { 
    this.solicitud=JSON.parse(sessionStorage.getItem('solicitud-titulacion')) || new SolicitudesTitulacion();
  if(!this.solicitud.listaIng||this.solicitud.listaIng.length===0){
   this.solicitud.listaIng=[]
   this.solicitud.listaIng.push(new Ing());
  }

  }
  agregarCatalogo(){
    this.solicitud.listaIng.push(new Ing())
  }
  evento(e){
    const x = e.target.value;
    console.log('Esto es x_:',x);
      }
  ngOnInit(){

    this.service.getUsers().subscribe(
      (getdatos:any[]) =>  this.listaProf = getdatos ,
      (error: HttpErrorResponse) => { console.log(error.message)})

    this.obtenerFecha();
    this.fecha=this.formBuilder.group({
       fecha:''

    
      })
    
      this.obtenerfechaS();
      this.fechaS=this.formBuilder.group({
        fechaS:''
      })
      this.solicitud.codigoDocumento='SPT-';
      this.solicitudCodigoUsuario='SPT-';
      this.generar();
      this.generarCodigo();
     
    }

    generar(){
       /*localStorage*/
      let user_string = localStorage.getItem("currentUser");
      let user = JSON.parse(user_string);
      var x = user;
      //var id_usuario:number = x.id;
      this.usuario=x;
      console.log('user_string_:',user_string);
      console.log('usuario.id_:',this.usuario);

    }

  obtenerFecha(){
    this.date=new Date()
    this.date=this.datepipe.transform(this.date,'yyyy-MM-dd')
  }
  obtenerfechaS(){
    this.dateS=new Date()
    this.dateS=this.datepipe.transform(this.dateS,'yyyy')
  }
  generarCodigo(){
    var carrera_usuartio_id;
      if(this.usuario.id){
        var n:number=0;
        var carrera_id;
        var codigoDoc;
        this.service.findById(this.usuario).subscribe(data=>{
          //console.log('findById()');
          carrera_id=data[0].carrera_id;
          for(const key in data){
            if(data.hasOwnProperty(key))
            //console.log('element_:',data[key]);
          n++
          }
          //console.log('n_:',n);
           if(n>1){
             this.solicitudCodigoUsuario=this.solicitud.codigoDocumento +'I.T.S.YAV-'+this.dateS+'-';
             console.log('ifMayor1_:',this.solicitudCodigoUsuario);
           }
           if(n==1){
             if(carrera_id==1){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.B.J.M-'+this.date+'-';
              console.log('Carrera_:',this.solicitudCodigoUsuario) 
            }
             if(carrera_id==2){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.24.M.K-'+this.date+'-';
            console.log('Carrera_:',this.solicitudCodigoUsuario)
            }
            if(carrera_id==3){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.G.C.M-'+this.date+'-';
              console.log('Carrera_:',this.solicitudCodigoUsuario)
            }
            if(carrera_id==4){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.YAV.AC.V-'+this.date+'-';
              console.log('Carrera_:',this.solicitudCodigoUsuario)
            }
            if(carrera_id==5){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.YAV.GT.M-'+this.date+'-';
              console.log('Carrera_:',this.solicitudCodigoUsuario)
            }
            if(carrera_id==6){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.YAV.MK-'+this.date+'-';
              console.log('Carrera_:',this.solicitudCodigoUsuario)
            }
            if(carrera_id==7){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.YAV.ELT.N-'+this.date+'-';
              console.log('Carrera_:',this.solicitudCodigoUsuario)
            }
            if(carrera_id==8){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.YAV.ELT.V-'+this.date+'-';
              console.log('Carrera_:',this.solicitudCodigoUsuario)
            }
            if(carrera_id==9){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.B.J.V-'+this.date+'-';
              console.log('Carrera_:',this.solicitudCodigoUsuario)
            }
            if(carrera_id==10){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.YAV.AC.M-'+this.date+'-';
              console.log('Carrera_:',this.solicitudCodigoUsuario)
            }
            if(carrera_id==11){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.YAV.GT.V-'+this.date+'-';
              console.log('Carrera_:',this.solicitudCodigoUsuario)
            }
            if(carrera_id==12){
              this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+'I.T.S.G.C.DM.V-'+this.date+'-';
              console.log('Carrera_:',this.solicitudCodigoUsuario)
            }
           }
        
           this.service.getDocumentos().subscribe(data => {
             codigoDoc=data['datos'];
             //console.log('Nueva Consulta_:',codigoDoc)
             var m;

             for (let i = 0; i < codigoDoc.length; i++) {
               var t = codigoDoc[i].codigo_documento;
               var elemento = codigoDoc[i];
               console.log(t)
               var n = t.includes('SPT');
               console.log(n);
              if (n) {
                this.listaDocumentos.push(elemento);
                //codigoDoc.push(n);
              }
             }
             for (let m = 0; m < this.listaDocumentos.length; m++) {
               const element = this.listaDocumentos[m];
               console.log('listaDocumentos_:',element);
               
             }

             this.listaDocumentos.forEach(element => {
               //console.log('ELEMENT_:',element);

               m=element.codigo_documento;
               this.codigoGet=m;
               
             });
            
             var long=this.codigoGet.length;
             console.log('long_:',long);
             var cad2= m.slice(-1);
             var cad3 = m.slice(-2);
             var cad4 = m.slice(-3);
             if (cad3>10&&cad3<100) {
               console.log('cad3_:',cad3)
               cad2 = m.slice(-2);
               console.log('cad2_:',cad2);
             }
             if (cad4>100&&cad3<1000) {
              cad2 = m.slice(-3);
             }
             console.log('antes_del_if_:',cad2);
             //cad2 = +cad2;
             if (cad2==0) {
               cad2 = m.slice(-2);
               console.log('if_cad2_:',cad2);

            }
            if (cad3==0) {
              cad2 = m.slice(-3);
               console.log('if_cad2_:',cad2);
            }
             this.numeroActual=cad2;
            // parseInt(cad2);
             console.log('getDocumentos()_:',this.codigoGet);
             console.log(cad2,this.numeroActual);

             var x;
             // console.log('aleatorio',num)
              for(var y=1 ; y<=1000;y++){
                //num[y]=y;
                //y=3
                //numeroActual=2
                x = y;
                //x=2
                //console.log('x_:',x)
                if (this.numeroActual==x) {
                  x++
                  var k=x;
                  console.log('k_:',k)
                  this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+k;
                }
                //console.log('num_:',num[x]);
              }


          },
          //this.navigateToLogin()
          error => {
             //alert('Error FindById()');
              console.log('error_postUsuario_:', error)
          }
        )

           //var num:number[]=[];

          //this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+x;
        //this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+num[x];
                // this.usuario.codigoUser=this.solicitudCodigoUsuario;
        console.log('codigo_:',this.solicitudCodigoUsuario) 

          },
          
          error => {
            //this.generado=false;
            //this.openSnackBar("Usuario " + username + " no consta en una carrera", 'OK')
            //alert('Error FindById()');
            console.log('error_método_generar()_:', error)
          }
          )

         
      }
  }
  
  agregarMensaje(){
  
    console.log('quiero comprobar')
  }
  generarPdf(accion='open'){
    const defenicionSolicitud=this.getDefinicionSolicitud();
    switch(accion){
  case 'open' :pdfMake.createPdf(defenicionSolicitud).open(); break;
  case 'print':pdfMake.createPdf(defenicionSolicitud).print(); break;
  case 'download':pdfMake.createPdf(defenicionSolicitud).download(); break;
 default:pdfMake.createPdf(defenicionSolicitud).open();break 
    }

    }
 resetearForm(){
   this.solicitud= new SolicitudesTitulacion();
   sessionStorage.removeItem('solicitud-titulacion');
 }
 getObjectoDocumento(listaIng:Ing[]){
return{
  columns:[
    ...listaIng.map(ed=>{
      console.log('Esto es catologo',ed.catalogo)
      return [ed.catalogo]
    })
  ]
}

 }
 getDefinicionSolicitud(){
   sessionStorage.setItem('solicitud-titulacion',JSON.stringify(this.solicitud));
   return{
     content: [
      {
       text: 'Solicitud de Proyecto de Titulacion',
       bold:true,
       fontSize:20,
       alignment:'center',
       margin:[0,0,0,20]
      },
      {
      columns:[
        [{
         text:this.solicitudCodigoUsuario,
         style:'titulo'
          }]
      ]
    },/* 
    {
      columns:[
        [{text:this.solicitud.codigoDocumento,
        style:'num'
      }]
      ]
    }, */
      {
        columns:[
          [{
            text:this.solicitud.sumillas+':'+ this.date,
            style:'sumillas'
          }]
        ]
        
      },
      {
        columns:[
          [{
            text:'Destinatario',
            style:'destinatario'
          }]
        ]
      },
      this.getObjectoDocumento(this.solicitud.listaIng),
      {
        columns:[
          [{
            text:' Yo : '+ this.solicitud.presentacionSolicitante + " " +  'Con "C.I." '+ this.solicitud.cedula + " "
             +" "+ this.solicitud.cuerpo+' '+ this.solicitud.titulacion
            , style:'presentacionSolicitante'
          }]
        ]
      },
      /* {
        columns:[
          [{
            text:this.solicitud.cuerpo+''+this.solicitud.titulacion,
            style:'cuerpo'
          }]
        ]
      } */,
      /* {
        columns:[
          [{
            text:this.solicitud.titulacion,
            style:'titulacion'
          }]
        ]
      } */,
       {
        columns:[
          [{
            text:'Atentamente:'+''+'' +this.solicitud.presentacionSolicitante,
            style:'despedida'
          }]
        ]
      },
      {
        columns:[
          [{
            text:this.solicitud.presentacionSolicitante,
            style:'nombre'
          }]
        ]
      },
      {
        columns:[
          [{
            text:this.solicitud.cedula,
            style:'cedula'
          }]
        ]
      }
     ],
     styles:{
       sumillas:{
         fontSize:14,
         bold:true,
         margin:[0,20,0,10],
         /*decoration:'underline'*/
       },
       destinatario:{
         fontSize:14,
         margin:[0,20,0,10],
         bold:true
       },
       presentacionSolicitante:{
        fontSize:14,
        margin:[0,20,0,10]
       },
       cuerpo:{
        fontSize:14,
        margin:[0,20,0,10]
       },
       despedida:{
        fontSize:14,
        margin:[0,20,0,10],
        alignment:'center'
       },
       fecha:{
        fontSize:14,
        margin:[0,20,0,10]
       },
       titulacion:{
        fontSize:14,
        margin:[0,20,0,10],
        bold: true
       },
       titulo:{
        alignment:'center',
        fontSize:14,
        margin:[0,0,0,20],
        bold:true
       },
       num:{
         alignment:'center',
         fontSize:14,
         margin:[0,0,0,20],
         bold:true
        },
        nombre:{
          alignment:'center',
          fontSize:14,
          margin:[0,0,0,20],
          bold:true
         },
         cedula:{
          alignment:'center',
          fontSize:14,
          margin:[0,0,0,20],
          bold:true
         } 
     }
   }
 }   
}