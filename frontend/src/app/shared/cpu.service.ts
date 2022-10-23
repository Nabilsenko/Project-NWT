import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    defaultIfEmpty, filter, map, Observable, tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cpu } from '../types/cpu.types';

@Injectable({
    providedIn: 'root',
})
export class CpuService {
    private readonly _backendURL: any;

    private _defaultCpus: Cpu[];

    constructor(private _http: HttpClient) {
        this._backendURL = [];

        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }

        Object.keys(environment.backend.endpoints).forEach((k) => this._backendURL[k] = `${baseUrl}`);

        this._defaultCpus = [];
    }

    fetch(): Observable<Cpu[]> {
        return this._http.get<Cpu[]>('http://localhost:3000/cpu');
    }

    delete(id: string): Observable<string> {
        return this._http.delete('http://localhost:3000/cpu/'.concat(id))
            .pipe(
                map(() => id),
            );
    }

    create(cpu: Cpu): Observable<any> {
        return this._http.post<Cpu>('http://localhost:3000/cpu', cpu, {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                },
            ),
        });
    }
}
