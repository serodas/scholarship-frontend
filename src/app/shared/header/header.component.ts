import { Component, OnInit, Input } from '@angular/core';
import { BachillerService } from '../../services/bachiller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  @Input() codigodane: string;
  @Input() password: string;

  constructor(public service: BachillerService) { }

  ngOnInit() {
  }

  institucionAutenticada() {
    return this.service.institucionAutenticada();
  }

  salirSistema() {
    console.log('Salir del sistema');
    localStorage.removeItem('idinst');
    localStorage.removeItem('institucion');
  }

}
