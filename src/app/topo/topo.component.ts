import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Observable } from 'rxjs/Observable';
import { Oferta } from '../shared/oferta.model'
import { Subject } from 'rxjs/Subject';

import '../util/njx-extensions'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>

  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000) //executa a ação do switchMap após 1 segundo
      .distinctUntilChanged() //apenas dispara a consulta caso o termo da consulta seja diferente em relação a última solicitação
      .switchMap((termoDaBusca: string) => {
        //console.log('Requisição http para api')

        if(termoDaBusca.trim() === ''){
          //retorna um observable de array de ofertas vazio
          return Observable.of<Oferta[]>([])
        }

        return this.ofertasService.pesquisaOfertas(termoDaBusca)
      })
      .catch((erro: any) => {
        console.log(erro)

        return Observable.of<Oferta[]>([])
      })

  }

  public pesquisa(termoDaBusca: string): void{
    //console.log('Keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
    /*
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => {

      },
      (erro: any) => console.log(erro)
    );
    */
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }
}
