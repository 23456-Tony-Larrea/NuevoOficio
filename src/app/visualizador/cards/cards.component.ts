import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicio.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  listaSPT:any[]=[];
  listaMEM:any[]=[];
  listaCON:any[]=[];
  listaACT:any[]=[];
  listaHDV:any[]=[];
  listaSOL:any[]=[];

  documentos:any[]=[
    {usuario:'Usuario',
     instituto:'I.T.S.B.J',
     titulos:'Gestion de documentos',
     boton:'Realizar',
     publicar:'Publicar'
    },
    {usuario:'Usuario',
    instituto:'I.T.S.G.C',
    titulos:'Gestion de documentos',
    boton:'Realizar',
    publicar:'Publicar'
   },
   {usuario:'Usuario',
   instituto:'I.T.S.G.C',
   titulos:'Gestion de documentos',
   boton:'Realizar',
   publicar:'Publicar'
  },
 
   ]
  constructor(public service: ServicioService) { }

  ngOnInit() {
    
   }


}
