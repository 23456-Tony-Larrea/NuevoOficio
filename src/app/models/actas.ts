export class Actas {
    titulo : string
    inicio : string
    ordenDelDia  : Orden[] = []
    desarrollo : string
    despedida : string
    codigoDocumento:string;
    fechaCodigo:string;
    InstitutoPertenciciente:string;
    logoPic:string;
    constructor(){
        this.ordenDelDia.push(new Orden())
    }
}

export class Orden {
    orden : string
}