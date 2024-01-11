import { HttpHeaders } from '@angular/common/http';

export const URL_SERVICIOS = 'https://bachillerbackend.comfamiliar.com/';

export const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //'Content-Type' : 'application/json',
    //'Authorization': 'my-new-auth-token'
  })
};

export const ERROR_CONSULTANDOSERVICIO: String = 'Error consultando el servicio';
