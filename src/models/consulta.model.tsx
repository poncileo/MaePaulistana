export class Consulta {
  constructor(id?: number, data?: Date, hora?: string, idGestante?: number ) {
    this.id = id;
    this.data = data;
    this.hora = hora;
    this.idGestante = idGestante;
  }

  public id: number;
  public data: Date;
  public hora: string;
  public idGestante: number;

}