import { Component, OnInit } from '@angular/core';
import { CpuService } from '../shared/cpu.service';
import {Cpu} from '../types/cpu.types';


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
       }},
      );
  }

  delete(i: number): void {
    console.log("***********************************************", i)
    this._cpuService
      .delete(this._cpus[i]._id as string)
      .subscribe((id: string) => this._cpus = this._cpus.filter((c: Cpu) => c._id !== id));
  }

}
