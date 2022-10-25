import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import DialogComponent from '../shared/dialog/dialog.component';
import { Cpu } from '../types/cpu.types';
import { CpuService } from '../shared/cpu.service';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
    private _cpuDialog: MatDialogRef<DialogComponent, Cpu> | undefined;

    private _route: ActivatedRoute;

    private _router: Router;

    private _cpuService: CpuService;

    private _dialog: MatDialog;

    constructor(route: ActivatedRoute, router: Router, cpuService: CpuService, dialog: MatDialog) {
        this._route = route;
        this._router = router;
        this._cpuService = cpuService;
        this._dialog = dialog;
    }

    ngOnInit(): void {
        this._route.params.pipe(
            map((params: any) => params.id),
            mergeMap((id: string) => this._cpuService.fetchOne(id)),
        ).subscribe((cpu: Cpu) => this.initModal(cpu));
    }

    private initModal(cpuIn: Cpu): void {
        this._cpuDialog = this._dialog.open(DialogComponent, {
            width: '500px',
            disableClose: true,
            data: cpuIn,
        });

        this._cpuDialog.afterClosed().pipe(
            filter((cpu: Cpu | undefined) => !!cpu),
            map((cpu: Cpu | undefined) => {
                const id = cpu?._id;
                return {
                    id,
                    update: {
                        ...cpu,
                        _id: undefined,
                    },
                };
            }),
            mergeMap((_: {id: any, update: any}) => {
                console.log("update test", _.update)
                return this._cpuService.update(_.id, _.update)
            }) ,
        ).subscribe({
            error: () => this._router.navigate(['/list']),
            complete: () => {
                return this._router.navigate(['/list']);
            } ,
        });
    }
}
