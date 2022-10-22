import { Component, OnInit } from '@angular/core';
import { CpuService } from '../shared/cpu.service';
import {Cpu} from '../types/cpu.types';
import {BASE64} from '../../assets/base64'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public _cpus : Cpu[];

  constructor(private _cpuService : CpuService) { 
      this._cpus = [];
  }

  get cpus() : Cpu[] {
    return this._cpus;
  }

  ngOnInit(): void { 
    this._cpuService
      .fetch()
      .subscribe({ next: (cpu: Cpu[]) => this._cpus = cpu, error: () => {
        this._cpus.push({name :"Intel i7", brand:"/assets/intel-i7.png", core:{physical: 10, thread :15}, frequency:{base: 2.5, turbo :4.1}});
        this._cpus.push({name :"AMD Ryzen 5", image : BASE64[0], brand:"/assets/ryzen-5.png", core:{physical: 20, thread :25}, frequency:{base: 3.5, turbo :4.9}});
        this._cpus.push({name :"AMD Ryzen 5", brand:"/assets/ryzen-5.png", core:{physical: 20, thread :25}, frequency:{base: 3.5, turbo :4.9}});
      }},
      );

  }

}
