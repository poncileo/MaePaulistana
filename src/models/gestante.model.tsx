export class Gestante {
  constructor(id?: number, nome?: string, 
    dtNascimento?: Date, dum?: Date, dpp?: Date, 
    sisPreNatal?: number, sus?: number, qntConsultas?: number){
      
      this.id = id;
      this.nome = nome;
      this.dtNascimento = dtNascimento;
      this.dum = dum;
      this.dpp = dpp;
      this.sisPreNatal = sisPreNatal;
      this.sus = sus;
      this.qntConsultas = qntConsultas;
 
    }
    public id: number;
    public nome: string;
    public dtNascimento: Date;
    public dum: Date;
    public dpp: Date;
    public sisPreNatal: number;
    public sus: number;
    public qntConsultas: number;
}