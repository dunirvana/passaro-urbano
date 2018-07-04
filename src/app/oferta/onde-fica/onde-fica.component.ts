import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {OfertasService} from '../../ofertas.service'

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers:[OfertasService]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = '';

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    //recueperar parametro da rota pai
    //console.log('ID da rota pai:', this.route.parent.snapshot.params['id']);

    this.route.parent.params.subscribe((parametros: Params) =>{

      this.ofertasService.getOndeFicaOfertaPorId(parametros.id)
      .then((resposta: string) => {
        this.ondeFica = resposta;
      })
              
    });
    
  }

}
