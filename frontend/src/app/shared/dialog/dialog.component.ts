import {
    Component, Inject, OnInit, Optional,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cpu } from '../../types/cpu.types';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
})
export default class DialogComponent implements OnInit {
    constructor(
        private _dialogRef: MatDialogRef<DialogComponent, Cpu>,
        @Optional() @Inject(MAT_DIALOG_DATA) private _cpu: Cpu,
    ) {}

    ngOnInit(): void {}

    get cpu(): Cpu {
        return this._cpu;
    }

    onCancel() {
        this._dialogRef.close();
    }

    onSave(cpu: Cpu) :void {
        this._dialogRef.close(cpu);
    }
}
