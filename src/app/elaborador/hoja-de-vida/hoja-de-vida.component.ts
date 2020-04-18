import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Resume, Experience, Education, Skill } from '../../models/resume';
import {FormBuilder} from '@angular/forms'
import {DatePipe} from '@angular/common'
import { ServicioService } from 'src/app/servicio.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userData';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-hoja-de-vida',
  templateUrl: './hoja-de-vida.component.html',
  styleUrls: ['./hoja-de-vida.component.css']
})
export class HojaDeVidaComponent implements OnInit {
  selectedItem: string;
  resume = new Resume();
  degrees = ['Básico', 'Inicial','Bachillerato', 'Estudios Superiores'];
  date:any;
  fecha:any;
  dateS:any;
  fechaS:any;
  usuario:UserData;
  dialog: any;
  hdvCodigoUsuario:string;
  codigoGet:string;
  numeroActual:number;
  numeroSiguiente:number;
  listaDocumentos:any[]=[];
  InstitutoPertenciciente:string
  constructor(private formBuilder:FormBuilder,
    public datepipe:DatePipe,
    public service: ServicioService,
    public router: Router) {
    
    this.resume = JSON.parse(sessionStorage.getItem('hoja-de-vida')) || new Resume();
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }

   }

  ngOnInit(){
    this.obtenerFecha();
    this.fecha=this.formBuilder.group({
       fecha:''

    
      })
    
      this.obtenerfechaS();
      this.fechaS=this.formBuilder.group({
        fechaS:''
      })
      this.resume.codigoDocumento='HDV-'
      this.hdvCodigoUsuario='HDV-'
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
             this.hdvCodigoUsuario=this.resume.codigoDocumento +'I.T.S.YAV-'+this.dateS+'-';
             console.log('ifMayor1_:',this.hdvCodigoUsuario);
             this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior "Yavirac"'
             console.log('hola yavirac')          
            }
           if(n==1){
             if(carrera_id==1){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.B.J.M-'+this.dateS+'-';
              console.log('Carrera_:',this.hdvCodigoUsuario) 
              this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'"Instituto Tecnologico Superior "Benito Juárez"'
              console.log('hola yavirac'+"Instituto Tecnologico Superior Benito Juarez" )   
            }
             if(carrera_id==2){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.24.M.K-'+this.dateS+'-';
            console.log('Carrera_:',this.hdvCodigoUsuario)
            this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior 24 de Mayo'
            console.log('hola yavirac'+"'Instituto Tecnologico Superior 24 de Mayo'")     
          }
            if(carrera_id==3){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.G.C.M-'+this.dateS+'-';
              console.log('Carrera_:',this.hdvCodigoUsuario)
              this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior "Gran Colombia"'
              console.log('hola yavirac'+"Instituto Tecnologico Superior Gran Colombia")   
            }
            if(carrera_id==4){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.YAV.AC.V-'+this.dateS+'-';
              console.log('Carrera_:',this.hdvCodigoUsuario)
              this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior "Yavirac"'
              console.log('hola yavirac'+"Instituto Tecnologico Superior Yavirac")   
            }
            if(carrera_id==5){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.YAV.GT.M-'+this.dateS+'-';
              console.log('Carrera_:',this.hdvCodigoUsuario)
              this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior "Yavirac"'
              console.log('hola yavirac'+"Instituto Tecnologico Superior Yavirac")   
            }
            if(carrera_id==6){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.YAV.MK-'+this.dateS+'-';
              console.log('Carrera_:',this.hdvCodigoUsuario)
              this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior "Yavirac"'
              console.log('hola yavirac'+"Instituto Tecnologico Superior Yavirac")   
            }
            if(carrera_id==7){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.YAV.ELT.N-'+this.dateS+'-';
              console.log('Carrera_:',this.hdvCodigoUsuario)
              this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior "Yavirac"'
              console.log('hola yavirac'+"Instituto Tecnologico Superior Yavirac")   
            }
            if(carrera_id==8){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.YAV.ELT.V-'+this.dateS+'-';
              console.log('Carrera_:',this.hdvCodigoUsuario)
              this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior "Yavirac"'
              console.log('hola yavirac'+"Instituto Tecnologico Superior Yavirac")   
            }
            if(carrera_id==9){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.B.J.V-'+this.dateS+'-';
              console.log('Carrera_:',this.hdvCodigoUsuario)
              this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior "Benito Juárez"'
              console.log('hola yavirac'+"Instituto Tecnologico Superior Benito Juarez")   
            }
            if(carrera_id==10){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.YAV.AC.M-'+this.dateS+'-';
              console.log('Carrera_:',this.hdvCodigoUsuario)
              this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior "Yavirac"'
              console.log('hola yavirac'+"Instituto Tecnologico Superior Yavirac")   
               
            }
            if(carrera_id==11){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.YAV.GT.V-'+this.dateS+'-';
              console.log('Carrera_:',this.hdvCodigoUsuario)
              this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior "Yavirac"'
              console.log('hola yavirac'+"Instituto Tecnologico Superior Yavirac")   
            }
            if(carrera_id==12){
              this.hdvCodigoUsuario=this.hdvCodigoUsuario+'I.T.S.G.C.DM.V-'+this.dateS+'-';
              console.log('Carrera_:',this.hdvCodigoUsuario)
              this.InstitutoPertenciciente=this.resume.InstitutoPertenciciente+'Instituto Tecnologico Superior Gran Colombia'
              console.log('hola yavirac'+"Instituto Tecnologico Superior Gran Colombia")   
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
               var n = t.includes('HDV');
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
                  this.hdvCodigoUsuario=this.hdvCodigoUsuario+k;
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
        console.log('codigo_:',this.hdvCodigoUsuario) 

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
    console.log('Hola Elaborador!°');
  }

  //Métodos a usar
  addExperience() {
    this.resume.experiences.push(new Experience());
  }
  addEducation() {
    this.resume.educations.push(new Education());
  }
  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }
  resetForm() {
    this.resume = new Resume();
    sessionStorage.removeItem('hoja-de-vida');
  }
  getDocumentDefinition() {
    sessionStorage.setItem('hoja-de-vida', JSON.stringify(this.resume));
    return {
      content: [
        {
          text: 'Hoja de Vida',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns:[
            [{text:this.hdvCodigoUsuario,
            style:'num'
          }]
          ]
        }, 
        {
          columns: [
            [{
              text: this.resume.name,
              style: 'name'
            },
            {
              text: this.resume.address
            },
            {
              text: 'Email : ' + this.resume.email,
            },
            {
              text: 'Teléfono : ' + this.resume.contactNo,
            },
            {
              text: 'Usuario GitHub: ' + this.resume.socialProfile,
              link: this.resume.socialProfile,
              color: 'green',
            }
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        {
          text: 'Habilidades',
          style: 'header'
        },
        {
          columns : [
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
              ]
            }
          ]
        },
        {
          text: 'Experiencia',
          style: 'header'
        },
        this.getExperienceObject(this.resume.experiences),
        {
          text: 'Educación',
          style: 'header'
        },
        this.getEducationObject(this.resume.educations),
        {
          text: 'Otros Detalles',
          style: 'header'
        },
        {
          text: this.resume.otherDetails
        },
        {
          text: 'Firma',
          style: 'sign'
        },
        {
          columns : [
              { qr: this.resume.name + ', Teléfono de contacto : ' + this.resume.contactNo, fit : 100 },
              {
              text: `(${this.resume.name})`,
              alignment: 'right',
              }
          ]
        }
      ],
      info: {
        title: this.resume.name + '_HOJA DE VIDA',
        author: this.resume.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }

  getExperienceObject(experiences: Experience[]) {
    const exs = [];
    experiences.forEach(experience => {
      exs.push(
        [{
          columns: [
            [{
              text: experience.jobTitle,
              style: 'jobTitle'
            },
            {
              text: experience.employer,
            },
            {
              text: experience.jobDescription,
            }],
            {
              text: 'Experiencia : ' + experience.experience + ' Meses',
              alignment: 'right'
            }
          ]
        }]
      );
    });
    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }
  getEducationObject(educations: Education[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Grado',
            style: 'tableHeader'
          },
          {
            text: 'Universidad',
            style: 'tableHeader'
          },
          {
            text: 'Año que Cursa',
            style: 'tableHeader'
          },
          {
            text: 'Porcentaje',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [ed.degree, ed.college, ed.passingYear, ed.percentage];
          })
        ]
      }
    };
  }


  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic ,
        width: 75,
        alignment : 'right'
      };
    }
    return null;
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  addSkill() {
    this.resume.skills.push(new Skill());
  }
  
}
