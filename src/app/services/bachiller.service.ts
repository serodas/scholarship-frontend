import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, HTTPOPTIONS } from '../config/config';
import { Institucion } from '../models/institucion.model';
import { Requerimiento } from '../models/requerimiento.model';
import { Respuesta } from '../models/respuesta.model';
import { Becado } from '../models/becado.model';
import { Documentopresentado } from '../models/documentopresentado.model';
import { Ciudad } from '../models/ciudad.model';

import swal from 'sweetalert2';

@Injectable()
export class BachillerService {

  constructor(public http: HttpClient) {

  }

  consultarInstitucionLogin(codigodane: String, password: String) {
    // const reservaJson = JSON.stringify( reserva );
    const url = URL_SERVICIOS + 'login/institucion';
    const body = 'codigodane=' + codigodane + '&' +
    'password=' + password;

    return this.http.post(url, body, HTTPOPTIONS).pipe(
            map((resp: Respuesta ) => {
              return <Respuesta>resp;
            }
      )
    );
  }

  consultarInstitucion(id: String): Promise<Institucion> {
    console.log('En instituciones');
    const url = URL_SERVICIOS + 'institucion/findbyid/'
          + id + '/' + localStorage.getItem('token');

    return new Promise((resolve, reject) => {
      this.http.get(url)
      .toPromise()
      .then(res => {
        console.log('Respuesta consultarInstitucion: ', res);
        resolve(<Institucion>res);
      },
      msg => {
          reject(msg);
        }
      );
    });
  }

  consultarRequerimientos(): Promise<Requerimiento[]> {
    // const reservaJson = JSON.stringify( reserva );
    console.log('En requerimientos');
    const url = URL_SERVICIOS + 'requerimiento/findall';

    return new Promise((resolve, reject) => {
      this.http.get(url)
      .toPromise()
      .then(res => {
        console.log('Respuesta: ', res);
        resolve(<Requerimiento[]>res);
      },
      msg => {
          reject(msg);
        }
      );
    });
  }

  consultarBecados(): Promise<Becado[]> {
    // const reservaJson = JSON.stringify( reserva );
    const url = URL_SERVICIOS + 'becado/findall';

    return new Promise((resolve, reject) => {
      this.http.get(url)
      .toPromise()
      .then(res => {
        console.log('Respuesta: ', res);
        resolve(<Becado[]>res);
      },
      msg => {
          reject(msg);
        }
      );
    });
  }

  consultarPostulados(idinstitucion: String): Promise<Becado[]> {
    // const reservaJson = JSON.stringify( reserva );
    const url = URL_SERVICIOS + 'becado/findbyidinstitucion/' + idinstitucion
                  + '/' + localStorage.getItem('token');

    return new Promise((resolve, reject) => {
      this.http.get(url)
      .toPromise()
      .then(res => {
        console.log('Respuesta: ', res);
        resolve(<Becado[]>res);
      },
      msg => {
          reject(msg);
        }
      );
    });
  }

  registrarPostulado(postulado: Becado) {
    const url = URL_SERVICIOS + 'becado/registrarService';
    const body = 'json=' + JSON.stringify(postulado) + '&' +
                'token=' + localStorage.getItem('token');

    console.log('Url', url);
    console.log('Body', body);
    return this.http.post(url, body, HTTPOPTIONS).pipe(
          map((resp: any ) => {
            return resp;
          }));
  }

  institucionAutenticada() {
    return (localStorage.getItem('idinst') || '').length > 0 ? true : false;
  }

  subirArchivo(archivo: File, documentopresentado: Documentopresentado): Promise<Respuesta> {
    return new Promise((resolve, reject) => {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();

    formData.append('archivo', archivo);

    formData.append('id', documentopresentado.id.toString());
/*
    if (documentoproceso.descripcion === undefined) {
      formData.append('descripcion', '');
    } else {
      formData.append('descripcion', documentoproceso.descripcion);
    }
  */
 /*
    formData.append('idtipodocumento', documentoproceso.idtipodocumento.toString());
    //      formData.append('archivo', archivo, files[i].name);
   */
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('Archivo subido.  Respuesta' + xhr.response);
        resolve(<Respuesta> JSON.parse(xhr.response));
      } else {
        console.log('Fallo la subida. xhr: ' + xhr);
        reject(xhr.response);
      }
    }
    };
    /*
    const url = URL_SERVICIOS + '/documentoproceso/upload/' +
                          documentoproceso.idproceso + '/' +
                          documentoproceso.descripcion + '/' +
                          documentoproceso.idtipodocumento + '/' +
                          localStorage.getItem('token');
    */
    const url = URL_SERVICIOS + 'becado/upload/' +
                          localStorage.getItem('token');
    console.log(url);

    xhr.open('POST', url, true);

    xhr.send(formData);
    });
  }

  cancelarUpload(documentopresentado: Documentopresentado) {
        // const reservaJson = JSON.stringify( reserva );
    const url = URL_SERVICIOS + 'becado/deleteupload/' + documentopresentado.id.toString() + '/' + localStorage.getItem('token');


    return new Promise((resolve, reject) => {
      this.http.get(url)
      .toPromise()
      .then(res => {
        console.log('Respuesta: ', res);
        resolve(<Respuesta>res);
      },
      msg => {
          reject(msg);
        }
      );
    });

  }

  consultarCiudades(): Promise<Ciudad[]> {
    // const reservaJson = JSON.stringify( reserva );
    console.log('En ciudades');
    const url = URL_SERVICIOS + 'ciudad/findall';

    return new Promise((resolve, reject) => {
      this.http.get(url)
      .toPromise()
      .then(res => {
        console.log('Respuesta: ', res);
        resolve(<Ciudad[]>res);
      },
      msg => {
          reject(msg);
        }
      );
    });
  }

  enviaMailConvocatoriacodigodane(codigodane: String): Promise<Respuesta> {
    const url = URL_SERVICIOS + 'institucion/enviarcorreoconvocatoriadane/'
              + codigodane;

    return new Promise((resolve, reject) => {
      this.http.get(url)
      .toPromise()
      .then(res => {
        console.log('Respuesta: ', res);
        resolve(<Respuesta>res);
      },
      msg => {
          swal.fire('Error', 'x', 'error');
          reject(msg);
        }
      );
    });
  }

  consultarAfiliado(cunumid: string): Promise<Respuesta> {
    let url;

    url = 'https://wssigec.comfamiliar.com/webresources/afiliaciontrabajador/consultabeneficiarioafiliado/' + cunumid;

    return new Promise((resolve, reject) => {
      console.log('Url: ', url);

      this.http.get(url)
      .toPromise()
      .then(res => {
        resolve(<Respuesta>res);
      },
      msg => {
          reject(msg);
        }
      );
    });
  }
}
