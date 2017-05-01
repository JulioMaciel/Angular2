import { Http, Headers, Response } from '@angular/http';
import { FotoComponent } from './foto.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable() // estou dizendo que o angular pode buscar as referência. 
// Por padrão classes não são injectable.
export class FotoService
{
    http: Http;
    headers: Headers;
    url: string = 'v1/fotos';

    constructor(http: Http) { 

        this.http = http;        
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    cadastra(foto: FotoComponent): Observable<Response>
    //nao tipou o Observable, pq ele só retorna uma response, nao dados
    {
        return this.http
                .post(this.url, JSON.stringify(foto), { headers: this.headers});
    }

    lista(): Observable<FotoComponent[]>
    {
        return this.http.get(this.url)
                        .map(res => res.json());
    }
}