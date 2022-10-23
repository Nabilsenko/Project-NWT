import { Component, OnInit } from '@angular/core';
import { CpuService } from '../shared/cpu.service';
import { Cpu } from '../types/cpu.types';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import DialogComponent from "../shared/dialog/dialog.component";
import {filter, mergeMap, Observable} from "rxjs";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
    public _cpus : Cpu[];

    private _dialogStatus: string;

    private _cpuDialog: MatDialogRef<DialogComponent, Cpu> | undefined;

    constructor(
        private _cpuService : CpuService,
        private _dialog: MatDialog,
    ) {
        this._cpus = [];
        this._dialogStatus = 'inactive';
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
                },
            });
    }

    delete(i: number): void {
        console.log('***********************************************', i);
        this._cpuService
            .delete(this._cpus[i]._id as string)
            .subscribe((id: string) => {
                this._cpus = this._cpus.filter((c: Cpu) => c._id !== id);
            });
    }

    get dialogStatus(): string {
        return this._dialogStatus;
    }

    showDialog() {
        this._dialogStatus = 'active';
        this._cpuDialog = this._dialog.open(DialogComponent, {
            width: '500px',
            disableClose: true,
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._cpuDialog.afterClosed()
            .pipe(
                filter((cpu: Cpu | undefined) => !!cpu),
                mergeMap((cpu: Cpu | undefined) => this._add(cpu)),
            )
            .subscribe({
                /**ext: (cpu: Cpu) => {
                    this._cpus.push(cpu);
                },*/
                next: (cpu: Cpu) => this._cpus = this._cpus.concat(cpu),

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
        console.log("----------",cpu);
        
        return this._cpuService.create(cpu as Cpu);
    }
}
