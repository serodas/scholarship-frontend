import { Documentopresentado } from './documentopresentado.model';
export class Becado {
    public id: number;
    public tipodocumento: string;
    public numerodocumento: string;
    public primerapellido: string;
    public segundoapellido: string;
    public primernombre: string;
    public segundonombre: string;
    public genero: string;
    public correoelectronico: string;
    public telefonofijo: string;
    public telefonomovil: string;
    public codigociudad: string;
    public direccion: string;
    public valorbeca: number;
    public vigenciainicia: number;
    public jornada: string;
    public sede: string;
    public vigencia: number;
    public idinstitucion;
    public mocodmotiv: string;
    public observacion: string;
    public esafiliado: string;

    public documentospresentados: Documentopresentado[];

    //public idinstitucion;
}
