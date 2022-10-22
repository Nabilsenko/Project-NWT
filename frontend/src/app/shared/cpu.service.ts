import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cpu } from '../types/cpu.types';
import { defaultIfEmpty, filter, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
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
  
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}`);

    this._defaultCpus = [];
    this._defaultCpus.push({name :"Intel i7", brand:"/assets/intel-i7.png", core:{physical: 10, thread :15}, frequency:{base: 2.5, turbo :4.1}});
    this._defaultCpus.push({name :"AMD Ryzen 5", brand:"/assets/ryzen-5.png", core:{physical: 20, thread :25}, frequency:{base: 3.5, turbo :4.9}});
    
  }

  fetch(): Observable<Cpu[]> {
    return this._http.get<Cpu[]>("http://localhost:3000/list")  
  }
}
