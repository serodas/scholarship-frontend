import { Component, OnInit } from '@angular/core';
import { BachillerService } from '../services/bachiller.service';
import { Institucion } from '../models/institucion.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { Respuesta } from '../models/respuesta.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  public inst: Institucion;

  public codigodane: string;
  public password: string;

  public respuesta: Respuesta;

  constructor(public service: BachillerService, public router: Router) {
      const urlTree = this.router.parseUrl(this.router.url);

      this.codigodane = urlTree.queryParams['codigodane'];
      this.password = urlTree.queryParams['password'];
  }

  ngOnInit() {

  }

  login() {
    this.service.consultarInstitucionLogin(this.codigodane, this.password)
    .subscribe(
      res => {
        this.respuesta = res;
        if (this.respuesta.code === '200') {
          localStorage.setItem('idinst', this.respuesta.id.toString());
          localStorage.setItem('token', this.respuesta.msg);
          this.router.navigate([ '/postulacion' ]);
        } else {
          swal.fire('Error!', 'Error en el código DANE o en el password', 'error');
        }
//        this.mensajeService.mostrarMensajeCodigo(this.respuesta.code, this.respuesta.msg);
      }, error => {
        alert('Se ha presentado un error.' + error.message)
      }
    );
  }

  validarInstitucion(forma: NgForm) {

    if (forma.invalid) {
      swal.fire('Hello world!');
      return;
    }

    this.login();
  }

  enviarCorreoConvocatoria() {
    this.service.enviaMailConvocatoriacodigodane(this.codigodane)
    .then(
      res => {
        this.respuesta = res;
        if (this.respuesta.code === '200') {
          swal.fire('Ok', this.respuesta.msg, 'success');
        } else {
          swal.fire('Error', 'Error', 'error');
        }
      }
    );
  }

  recuperarContrasena() {
    if (this.codigodane === undefined || this.codigodane === null || this.codigodane.length < 5) {
      swal.fire('Por favor indique el codigo DANE');
      return;
    }
    this.enviarCorreoConvocatoria();
  }

}
