import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reglamento',
  templateUrl: './reglamento.component.html',
  styles: []
})
export class ReglamentoComponent implements OnInit {
  images = ['assets/images/banner2.jpg', 'assets/images/banner1.jpg'];
  codigodane: string;
  password: string;

  constructor(private route: ActivatedRoute, public router: Router) {
    const urlTree = this.router.parseUrl(this.router.url);

    if (urlTree.fragment !== undefined && urlTree.fragment !== null && urlTree.fragment.length > 0) {
      const str = urlTree.fragment.substring(1, urlTree.fragment.length);

      this.codigodane = str.substr(0, str.indexOf('/', 1));
      this.password = str.substr(str.indexOf('/', 1) + 1, str.length);
    }
  }

  ngOnInit() {
  }

}
