import { Sede } from './sede.model';

export class Institucion {
    public id: number;
    public nucleo: String;
    public jerarquia: String;
    public nombreinstitucion: String;
    public comuna: String;
    public direccion: String;
    public telfijo: String;
    public movil: String;
    public cargo: String;
    public nombreresponsable: String;
    public correoelectronico: String;
    public zona: String;
    public codigodane: String;

    public sedes: Sede[];
}
