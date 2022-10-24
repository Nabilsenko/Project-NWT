import { Component, OnInit } from '@angular/core';
import { CpuService } from '../shared/cpu.service';
import { Cpu } from '../types/cpu.types';

@Component({
    selector: 'app-comparator',
    templateUrl: './comparator.component.html',
    styleUrls: ['./comparator.component.css'],
})
export class ComparatorComponent implements OnInit {
    public _cpus_1: Cpu[];
    public _cpus_2: Cpu[];
    public _cpus_tmp1: Cpu[];
    public _cpus_tmp2: Cpu[];
    public keyword_1: string;
    public keyword_2: string;
    public cpu_compare_1: Cpu;
    public cpu_compare_2: Cpu;
    public cpu_percent_1: number;
    public cpu_percent_2: number;
    public result: string;

    constructor(private _cpuService: CpuService) {
        this._cpus_1 = [];
        this._cpus_2 = [];
        this._cpus_tmp1 = [];
        this._cpus_tmp2 = [];
        this.keyword_1 = '';
        this.keyword_2 = '';
        this.cpu_compare_1 = {} as Cpu;
        this.cpu_compare_2 = {} as Cpu;
        this.cpu_percent_1 = 0;
        this.cpu_percent_2 = 0;
        this.result = ""
    }

    ngOnInit(): void {
        this._cpuService.fetch().subscribe({
            next: (cpu: Cpu[]) => {
                this._cpus_1 = cpu;
                this._cpus_tmp1 = this._cpus_1;
                this._cpus_2 = this._cpus_1;
                this._cpus_tmp2 = this._cpus_1;
            },
        });
    }

    addCompare_1(cpu: Cpu) {
        this.cpu_compare_1 = cpu;
    }

    addCompare_2(cpu: Cpu) {
        this.cpu_compare_2 = cpu;
    }

    changeKeyword_1(value: any) {
        this._cpus_1 = this._cpus_tmp1.filter((cpu) =>
            cpu.name
                .concat(cpu.brand as string)
                .toLowerCase()
                .includes(value.toLowerCase())
        );
    }

    changeKeyword_2(value: any) {
        this._cpus_2 = this._cpus_tmp2.filter((cpu) =>
            cpu.name
                .concat(cpu.brand as string)
                .toLowerCase()
                .includes(value.toLowerCase())
        );
    }

    compare() {
      console.log("compare clicked!!");
      
      if (this.cpu_compare_1.name !== undefined && this.cpu_compare_2.name !== undefined) {
        console.log("compare condtion satisfied!!");

        var _cP : number | undefined = this?.cpu_compare_1?.core?.physical;
        var _cP2 : number | undefined = this.cpu_compare_2.core.physical;
        let _cT = this?.cpu_compare_1?.core?.thread;
        let _cT2 = this.cpu_compare_2.core.thread;
        let _fB = this?.cpu_compare_1?.frequency?.base;
        let _fB2 = this.cpu_compare_2.frequency?.base;
        let _fT = this.cpu_compare_1.frequency?.turbo;
        let _fT2 = this.cpu_compare_2.frequency?.turbo;
        if(_cP && _cP2 ) {
          this.cpu_percent_1 += (_cP / _cP2);
          this.cpu_percent_2 += _cP2 / _cP;
        }
        if(_cT && _cT2 ) {
          this.cpu_percent_1 += _cT / _cT2;
          this.cpu_percent_2 += _cT2 / _cT;
        }
        if(_fB && _fB2 ) {
          this.cpu_percent_1 += _fB / _fB2;
          this.cpu_percent_2 = _fB2 / _fB;
        }
        if(_fT  && _fT2  ) {
          this.cpu_percent_1 = _fT  / _fT2;
          this.cpu_percent_2 = _fT2 / _fT ;
        }
        
        var difference : number = this.cpu_percent_1 - this.cpu_percent_2;
       
        if (difference < 0){
          this.result = this.cpu_compare_1.brand?.concat(" ",  this.cpu_compare_1.name) + " is " + this.percentPositif(difference) + "% Better than " + this.cpu_compare_2.brand?.concat(" ",  this.cpu_compare_2.name) + "!!";
        }
        else if (difference > 0){
          this.result = this.cpu_compare_2.brand?.concat(" ",  this.cpu_compare_2.name) + " is " + this.percentPositif(difference) + "% Better than " + this.cpu_compare_2.brand?.concat(" ",  this.cpu_compare_2.name) + "!!";
        }
        
        else {
          this.result = this.cpu_compare_1.brand?.concat(" ",  this.cpu_compare_1.name) + " and " + this.cpu_compare_2.brand?.concat(" ",  this.cpu_compare_2.name) + " are equal in performance!!";
        }
      }
      /* graphes code ici*/
      
    }

    percentPositif(i: number) : string {
      if( i < 0)
        i = i * -1;
      console.log(i);
      
      return (Math.round(i * 100) / 100).toFixed(2);
    }
}
