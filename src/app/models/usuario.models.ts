export class Usuario{

  static fromFirebase( userfirebase: any){

    return new Usuario(userfirebase.uid,userfirebase.nombre, userfirebase.email)  ;
  }
    constructor( public uid: string,
      public nombre: string, public email: string){
    }
}
