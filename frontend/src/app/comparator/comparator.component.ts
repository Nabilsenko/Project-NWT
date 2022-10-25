import { Component, OnInit } from '@angular/core';
import embed from 'vega-embed';
import _ from 'lodash';
import { Spec } from 'vega';
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
        this.result = '';
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
        this.result = '';
        this.cpu_compare_1 = cpu;
    }

    addCompare_2(cpu: Cpu) {
        this.result = '';
        this.cpu_compare_2 = cpu;
    }

    changeKeyword_1(value: any) {
        this._cpus_1 = this._cpus_tmp1.filter((cpu) => cpu.name
            .concat(cpu.brand as string)
            .toLowerCase()
            .includes(value.toLowerCase()));
    }

    changeKeyword_2(value: any) {
        this._cpus_2 = this._cpus_tmp2.filter((cpu) => cpu.name
            .concat(cpu.brand as string)
            .toLowerCase()
            .includes(value.toLowerCase()));
    }

    compare() {
        console.log('compare clicked!!');

        if (this.cpu_compare_1.name !== undefined && this.cpu_compare_2.name !== undefined) {
            console.log('compare condtion satisfied!!');

            const _cP : number | undefined = this?.cpu_compare_1?.core?.physical;
            const _cP2 : number | undefined = this.cpu_compare_2.core.physical;
            const _cT = this?.cpu_compare_1?.core?.thread;
            const _cT2 = this.cpu_compare_2.core.thread;
            const _fB = this?.cpu_compare_1?.frequency?.base;
            const _fB2 = this.cpu_compare_2.frequency?.base;
            const _fT = this.cpu_compare_1.frequency?.turbo;
            const _fT2 = this.cpu_compare_2.frequency?.turbo;
            if (_cP && _cP2) {
                this.cpu_percent_1 += (_cP / _cP2);
                this.cpu_percent_2 += _cP2 / _cP;
            }
            if (_cT && _cT2) {
                this.cpu_percent_1 += _cT / _cT2;
                this.cpu_percent_2 += _cT2 / _cT;
            }
            if (_fB && _fB2) {
                this.cpu_percent_1 += _fB / _fB2;
                this.cpu_percent_2 = _fB2 / _fB;
            }
            if (_fT && _fT2) {
                this.cpu_percent_1 = _fT / _fT2;
                this.cpu_percent_2 = _fT2 / _fT;
            }

            const difference : number = this.cpu_percent_1 - this.cpu_percent_2;

            if (difference > 0) {
                this.result = `${this.cpu_compare_1.brand?.concat(' ', this.cpu_compare_1.name)} is ${this.percentPositif(difference)}% Better than ${this.cpu_compare_2.brand?.concat(' ', this.cpu_compare_2.name)}!!`;
            } else if (difference < 0) {
                this.result = `${this.cpu_compare_2.brand?.concat(' ', this.cpu_compare_2.name)} is ${this.percentPositif(difference)}% Better than ${this.cpu_compare_2.brand?.concat(' ', this.cpu_compare_2.name)}!!`;
            } else {
                this.result = `${this.cpu_compare_1.brand?.concat(' ', this.cpu_compare_1.name)} and ${this.cpu_compare_2.brand?.concat(' ', this.cpu_compare_2.name)} are equal in performance!!`;
            }
        }
        /* graphes code ici */
        const specCore: any = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: {
                values: [
                    { category: 'Physical', group: this.cpu_compare_1.name, value: this.cpu_compare_1.core.physical },
                    { category: 'Physical', group: this.cpu_compare_2.name, value: this.cpu_compare_2.core.physical },
                    { category: 'Thread', group: this.cpu_compare_1.name, value: this.cpu_compare_1.core.thread },
                    { category: 'Thread', group: this.cpu_compare_2.name, value: this.cpu_compare_2.core.thread },
                ],
            },
            title: 'Cpu core count',
            mark: 'bar',
            encoding: {
                x: {
                    field: 'category',
                    title: 'Core type',
                },
                y: {
                    field: 'value',
                    type: 'quantitative',
                    title: 'Core count',
                },
                xOffset: { field: 'group' },
                color: {
                    field: 'group',
                    title: 'Cpu Name',
                },
            },
        };

        const specFrequency: any = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: {
                values: [
                    { category: 'Base', group: this.cpu_compare_1.name, value: this.cpu_compare_1.frequency.base },
                    { category: 'Base', group: this.cpu_compare_2.name, value: this.cpu_compare_2.frequency.base },
                    { category: 'Turbo', group: this.cpu_compare_1.name, value: _.get(this.cpu_compare_1.frequency, 'turbo', 0) },
                    { category: 'Turbo', group: this.cpu_compare_2.name, value: _.get(this.cpu_compare_2.frequency, 'turbo', 0) },
                ],
            },
            title: 'Cpu frequency',
            mark: 'bar',
            encoding: {
                x: {
                    field: 'category',
                    title: 'Frequency type',
                },
                y: {
                    field: 'value',
                    type: 'quantitative',
                    title: 'Frequency (MHz)',
                },
                xOffset: { field: 'group' },
                color: {
                    field: 'group',
                    title: 'Cpu name',
                },
            },
        };

        const specCache: any = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            data: {
                values: [],
            },
            title: 'Cpu cache',
            mark: 'bar',
            encoding: {
                x: {
                    field: 'category',
                    title: 'Cache type',
                },
                y: {
                    field: 'value',
                    type: 'quantitative',
                    title: 'Quantity (Ko/KB)',
                },
                xOffset: { field: 'group' },
                color: {
                    field: 'group',
                    title: 'Cpu name',
                },
            },
        };

        const maxCacheCount = Math.max(
            <number> this.cpu_compare_1.cache?.length,
            <number> this.cpu_compare_2.cache?.length,
        );

        for (let i = 0; i < maxCacheCount; i += 1) {
            specCache.data.values.push({
                category: `L${i + 1}`,
                group: this.cpu_compare_1.name,
                value: this.cpu_compare_1.cache?.at(i) || 0,
            });
            specCache.data.values.push({
                category: `L${i + 1}`,
                group: this.cpu_compare_2.name,
                value: this.cpu_compare_2.cache?.at(i) || 0,
            });
            console.log(specCache.data);
        }

        embed('#chart-core', specCore as Spec, { actions: false }).then();
        embed('#chart-frequency', specFrequency as Spec, { actions: false }).then();
        embed('#chart-cache', specCache as Spec, { actions: false }).then();
    }

    percentPositif(i: number) : string {
        if (i < 0) i *= -1;
        console.log(i);
        return (Math.round(i * 100) / 100).toFixed(2);
    }
}
