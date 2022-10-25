import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, mergeMap, Observable } from 'rxjs';
import { CpuService } from '../shared/cpu.service';
import { Cpu } from '../types/cpu.types';
import DialogComponent from '../shared/dialog/dialog.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
    public _cpus : Cpu[];

    public _cpus_tmp : Cpu[];

    private _dialogStatus: string;

    private _cpuDialog: MatDialogRef<DialogComponent, Cpu> | undefined;

    public keyword : string;

    constructor(
        private _cpuService : CpuService,
        private _dialog: MatDialog,
    ) {
        this._cpus = [];
        this._cpus_tmp = [];
        this._dialogStatus = 'inactive';
        this.keyword = '';
    }

    get cpus() : Cpu[] {
        return this._cpus;
    }

    ngOnInit(): void {
        this._cpuService
            .fetch()
            .subscribe({
                next: (cpu: Cpu[]) => {
                    this._cpus = cpu;
                    this._cpus_tmp = this._cpus;
                },
            });
    }

    delete(i: number): void {
        this._cpuService
            .delete(this._cpus[i]._id as string)
            .subscribe((id: string) => {
                this._cpus = this._cpus.filter((c: Cpu) => c._id !== id);
                this._cpus_tmp = this._cpus;
            });
    }

    get dialogStatus(): string {
        return this._dialogStatus;
    }

    displayFrequency(value: number | undefined): string {
        if (!value) return 'N/A';
        if (value < 1000) return `${value} MHz`;
        return `${(value / 1000.0).toFixed(2)} GHz`;
    }

    showDialog() {
        this._dialogStatus = 'active';
        this._cpuDialog = this._dialog.open(DialogComponent, {
            width: '500px',
            disableClose: true,
        });
        this._cpuDialog.afterClosed()
            .pipe(
                filter((cpu: Cpu | undefined) => !!cpu),
                mergeMap((cpu: Cpu | undefined) => this._add(cpu)),
            )
            .subscribe({
                error: (err) => {
                    console.log('Erreur !');
                    console.log(err);
                    this._dialogStatus = 'inactive';
                },
                complete: () => {
                    console.log('Saved !');
                    this._dialogStatus = 'inactive';
                },
            });
    }

    private _add(cpu: Cpu | undefined): Observable<Cpu> {
        this.cpus.push(cpu as Cpu);
        this._cpus_tmp = this._cpus;
        return this._cpuService.create(cpu as Cpu);
    }

    changeKeyword(value: any) {
        this._cpus = this._cpus_tmp.filter((cpu) => cpu.name.concat(cpu.brand as string).toLowerCase().includes(value.toLowerCase()));
    }
}
