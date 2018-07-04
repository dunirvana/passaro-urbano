import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {OfertasService} from '../ofertas.service'
import {Oferta} from '../shared/oferta.model'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';

import {CarrinhoService} from '../carrinho.service'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers:[OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;
  private tempoObservableSubscription: Subscription;
  private meuObservableTesteSubscription: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    
    console.log('Oferta - array de itens do carrinho', this.carrinhoService.exibirItens())

    //console.log('ID recuperado da rota por snapshot: ', this.route.snapshot.params['id']);

    this.route.params.subscribe((parametros: Params) =>{

      this.ofertasService.getOfertaPorId(parametros.id)
      .then((oferta: Oferta) => {
        this.oferta = oferta;
      })
              
    });


    /*
    this.route.params.subscribe(
      (parametro: any) => {
        console.log(parametro);
      },
      (erro: any) => {
        console.log(erro);
      },
      () => {
        console.log('Processamento classificado como concluido!');        
      }
  )

  */

  let tempo = Observable.interval(500);

  this.tempoObservableSubscription = tempo.subscribe((interval: number) => {
    console.log(interval);
  })  
  
  //observable (observável)
  let meuObservableTeste = Observable.create((observer: Observer<string>) => {
    observer.next('Primeiro evento da stream');
    //observer.error('Ocorreu um evento no stream de eventos');
    observer.complete();
    observer.next('Nunca é executado quando esta depois de "error" ou "complete"'); //!*
  });

  //observable (observador)
  this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
    (resultado: any) => console.log(resultado),
    (erro: any) => console.log(erro),
    () => console.log('Stream de eventos finalizada!')
  );
  }

  ngOnDestroy(){
    /**/
    this.meuObservableTesteSubscription.unsubscribe();
    this.tempoObservableSubscription.unsubscribe()
  }

  public adicionarItemCarrinho(): void {
    console.log('adicionarItemCarrinho: ', this.oferta)

    this.carrinhoService.incluirItem(this.oferta);
  }
}
