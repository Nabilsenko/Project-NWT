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
    // eslint-disable-next-line no-useless-constructor
    constructor(
        // eslint-disable-next-line no-unused-vars
        private _dialogRef: MatDialogRef<DialogComponent, Cpu>,
        // eslint-disable-next-line no-unused-vars
        @Optional() @Inject(MAT_DIALOG_DATA) private _cpu: Cpu,
        // eslint-disable-next-line no-empty-function
    ) {}

    // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-empty-function
    ngOnInit(): void {}

    get cpu(): Cpu {
        // eslint-disable-next-line no-underscore-dangle
        return this._cpu;
    }

    onCancel() {
        // eslint-disable-next-line no-underscore-dangle
        this._dialogRef.close();
    }

    onSave($event: Cpu) {
        // eslint-disable-next-line no-underscore-dangle
        this._dialogRef.close($event);
    }
}
