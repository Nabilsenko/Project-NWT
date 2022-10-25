import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    map, Observable,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import _ from 'lodash';
import { Cpu } from '../types/cpu.types';

@Injectable({
    providedIn: 'root',
})
export class CpuService {
    private readonly _backendURL: string;

    constructor(private _http: HttpClient) {
        this._backendURL = '';

        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }

        this._backendURL = `${baseUrl}/cpu`;
    }

    fetch(): Observable<Cpu[]> {
        return this._http.get<Cpu[]>(this._backendURL);
    }

    delete(id: string): Observable<string> {
        return this._http.delete(`${this._backendURL}/${id}`)
            .pipe(
                map(() => id),
            );
    }

    create(cpu: Cpu): Observable<any> {
        return this._http.post<Cpu>(this._backendURL, _.omit(cpu, ['_id', 'id']), {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                },
            ),
        });
    }

    update(id: any, update: any): Observable<any> {
        return this._http.put<Cpu>(`${this._backendURL}/${id}`, _.omit(update, ['_id', 'id']), {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                },
            ),
        });
    }

    fetchOne(id: string): Observable<Cpu> {
        return this._http.get<Cpu>(`${this._backendURL}/${id}`);
    }
}
