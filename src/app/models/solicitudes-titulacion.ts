export class SolicitudesTitulacion{
        sumillas:string;
        codigoDocumento:string;
        destinatario:string;
        presentacionSolicitante:string;
        cuerpo:string;
        despedida:string;
        fecha:string;
        firma:string;
        listaIng:Ing[]=[];
        cedula:string
        titulacion:string
        fechaCodigo:string;
        
        constructor(){
            this.listaIng.push(new Ing())
    
        }
    }
    export class Ing{
            catalogo:string;
        }
