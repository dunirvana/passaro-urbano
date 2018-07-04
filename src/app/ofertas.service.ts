import {Http, Response} from '@angular/http'
import {Injectable} from '@angular/core'
import { Observable } from 'rxjs/Observable';
import {Oferta} from './shared/oferta.model'

import {URL_API} from './app.api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'


@Injectable()
export class OfertasService{


    constructor(private http: Http){ }


    public getOfertas(): Promise<Array<Oferta>>{
        
        //efetuar uma requisição http
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json())

        //retornar uma promise de Oferta[]
    }

    public getOfertasPorCategoria(categoria: string): Promise<Array<Oferta>>{
        
        //efetuar uma requisição http
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())

        //retornar uma promise de Oferta[]
    }

    public getOfertaPorId(id: number): Promise<Oferta>{
        
        //efetuar uma requisição http
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json()[0])

        //retornar uma promise de Oferta[]
    }

    public getComoUsarOfertaPorId(id: number): Promise<string>{

        //efetuar uma requisição http
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json()[0].descricao)

    }

    public getOndeFicaOfertaPorId(id: number): Promise<string>{

        //efetuar uma requisição http
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json()[0].descricao)

    }

    public pesquisaOfertas(termo: string): Observable<Array<Oferta>>{
        //return this.http.get(`${URL_API}/ofertas?descricao_oferta=${termo}`)
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`) //"_like" recurso do json-server!
            .retry(10)
            .map((resposta: Response) => resposta.json(),
            () => console.log('Fluxo de eventos completo')
            )   
    }
    
}