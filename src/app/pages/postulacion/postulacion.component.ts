import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Becado } from '../../models/becado.model';
import { Respuesta } from '../../models/respuesta.model';
import { BachillerService } from '../../services/bachiller.service';

import swal from 'sweetalert2';
import { Documentopresentado } from '../../models/documentopresentado.model';
import { Institucion } from '../../models/institucion.model';
import { Ciudad } from '../../models/ciudad.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styles: []
})
export class PostulacionComponent implements OnInit {
  public postulados: Becado[] = [];
  public ciudades: Ciudad[] = [];
  public idinst: string;
  public imagenSubir: File;
  public token;
  public institucion: Institucion;
  public postulacionabierta = true;
  public esadmin;

  public postulado: Becado;
  public respuesta: Respuesta;
  public documentopresentado: Documentopresentado;

  constructor(public service: BachillerService,
    public router: Router) { }

  ngOnInit() {
    this.postulado = undefined;
    this.documentopresentado = undefined;
    this.idinst = localStorage.getItem('idinst');

    this.esadmin = this.idinst === '324';

    if (this.idinst !== null && this.idinst !== undefined) {
      this.inicializar();
    }
  }

  inicializar() {
    this.consultarCiudades();
    this.seleccionarSedes();
    this.consultarPostulados();
  }

  saveLocalStrore() {
    this.postulado = undefined;
    this.documentopresentado = undefined;
    this.inicializar();
    // localStorage.setItem('idinst', this.idinst);
  }

  editarPostulado(postulado: Becado) {
    console.log('Clic en');
    this.postulado = postulado;
  }

  registrarPostulado(forma: NgForm) {
    if (forma.invalid) {
      console.log('El formulario no es válido');
      return;
    }

    if (this.postulado.telefonomovil !== undefined && this.postulado.telefonomovil.length !== 10) {
      swal.fire('Error', 'El numero de celular debe tener una longitud de 10 caracteres', 'error');
    }

    this.service.registrarPostulado(this.postulado)
    .subscribe(
      res => {

        console.log(res.content);
        this.respuesta = JSON.parse(res.content);
        console.log('Registrar postulado:', this.respuesta);

        if (this.respuesta.code === '200') {
          swal.fire('Ok', 'Postulado registrado con exito', 'success');

          this.postulado = undefined;
          this.consultarPostulados();
        } else {
          swal.fire('Error', 'Error registrado el postulado', 'error');
        }

//        this.mensajeService.mostrarMensajeCodigo(this.respuesta.code, this.respuesta.msg);
      }
    );
  }

  consultarPostulados() {
    const hoy = new Date();
    const dd = hoy.getDate();
    const mm = hoy.getMonth() + 1;
    const yyyy = hoy.getFullYear();

    if (mm === 11 && dd > 26) {
      swal.fire('Advertencia!', 'El proceso de inscripción se encuentra cerrado. Solo de acepta actualizacion de documentos', 'error');
      this.postulacionabierta = false;
    }
    if (yyyy !== 2024) {
      this.postulacionabierta = false;
      swal.fire('Advertencia!', 'El proceso de inscripción se encuentra cerrado. Solo de acepta actualizacion de documentos', 'error');
    }

    if (this.esadmin) {
      console.log(this.idinst);
    }

    this.service.consultarPostulados(this.idinst)
    .then(
        res => {
            this.postulados = res;
            if (this.postulados.length === 0) {
              this.inicializarNuevoPostulado();
            }
        }
    )
    .catch(function (data) {
      swal.fire('Error', 'Error consultando los postulados de la institución', 'error');
    });
  }

  consultarCiudades() {
    this.service.consultarCiudades()
    .then(
        res => {
            this.ciudades = res;
            console.log('Ciudades', this.ciudades);
        }
    )
    .catch(function (data) {
      swal.fire('Error', 'Error consultando las ciudades', 'error');
    });
  }

  inicializarNuevoPostulado() {
    console.log('Inicializando postulado');
    this.postulado = new Becado();

    this.postulado.mocodmotiv = '01';
    this.postulado.idinstitucion = this.idinst;
  }

  guardarDocumento( f: NgForm ) {
    //    console.log( f.valid );
    if ( f.invalid ) {
      return;
    }

    if (this.imagenSubir.size > 1024 * 1024 * 2) {
      swal.fire('Error', 'El archivo supera los 2 mb', 'error');
      return;
    }

    this.service.subirArchivo(this.imagenSubir, this.documentopresentado)
    .then(resp => {
      this.respuesta = resp;

      switch (this.respuesta.code) {
        case '200' :
          swal.fire('', 'Registro exitoso', 'success');
          this.documentopresentado = undefined;
/*
          this.router.navigate([ 'postulacion' ])
          .then(() => {
            window.location.reload();
          });
*/
//          this.recuperarDocumentos();
          break;
        case '202':
          swal.fire('Error', this.respuesta.msg, 'error');
          break;
        case '400':
          swal.fire('Error', 'x', 'error');
          break;
        default:
          swal.fire('Error', 'Respuesta ' + this.respuesta.code + ' no definida', 'error');
          break;
      }
    })
    .catch( resp => {
      swal.fire('Error', 'Respuesta ' + resp, 'error');
    });
  }

  cancelarPostulacion() {
    this.postulado = undefined;
  }

  cancelarSubirarchivo() {
    this.documentopresentado = undefined;
  }

  iniciarCargaDocumento(doc: Documentopresentado) {
    console.log(doc);
    this.documentopresentado = doc;
    this.postulado = undefined;
    doc.presentado = '1';
//    documentopresentado
  }

  cancelarUpload(doc: Documentopresentado) {
    this.service.cancelarUpload(doc)
    .then(
        res => {
            doc.presentado = '0';
            swal.fire('Ok', 'Documento borrado con exito', 'success');
        }
    )
    .catch(function (data) {
      swal.fire('Error', 'Error consultando las ciudades', 'error');
    });
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    } else {
      this.imagenSubir = archivo;
    }
    console.log(archivo);
  }

  seleccionarSedes() {
    this.service.consultarInstitucion(this.idinst )
    .then(
        res => {
            this.institucion = res;
        }
    )
    .catch(function (data) {
      swal.fire('Error', 'Error consultando las instituciones en seleccionaar sedes', 'error');
    });
  }

  validarPostulado() {
    this.service.consultarAfiliado(this.postulado.numerodocumento)
    .then(
        res => {
          if (res) {
            if (res.code === '200') {
              this.postulado.esafiliado = 'S';
            } else {
              this.postulado.esafiliado = 'N';
            }
          }
        }
    )
    .catch(function (data) {
      swal.fire('Error', 'Error consultando los postulados de la institución', 'error');
    });
  }
}
