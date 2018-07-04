import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {OfertasService} from '../../ofertas.service'

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers:[OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = '';

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    //recueperar parametro da rota pai
    //console.log('ID da rota pai:', this.route.parent.snapshot.params['id']);

    this.route.parent.params.subscribe((parametros: Params) =>{

      this.ofertasService.getComoUsarOfertaPorId(parametros.id)
      .then((resposta: string) => {
        this.comoUsar = resposta;
      })
              
    });
    
  }

}
