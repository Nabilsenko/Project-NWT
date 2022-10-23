import {
    Component, EventEmitter, OnChanges, OnInit, Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// eslint-disable-next-line import/no-unresolved
import { Base64, Cpu } from '../../types/cpu.types';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
})
/* eslint no-underscore-dangle: 0 */
/* eslint class-methods-use-this: 0 */
export default class FormComponent implements OnInit, OnChanges {
    private readonly _form: FormGroup;

    private _model: any;

    private readonly _cancel$: EventEmitter<void>;

    private readonly _submit$: EventEmitter<Cpu>;

    private image: Base64<string>;

    private _isUpdateMode: boolean;

    constructor() {
        this._model = {} as any;
        this._isUpdateMode = false;
        this.image = '' as Base64<string>;
        this._cancel$ = new EventEmitter<void>();
        this._submit$ = new EventEmitter<Cpu>();
        this._form = this._buildForm();
    }

    get form(): FormGroup {
        // eslint-disable-next-line no-underscore-dangle
        return this._form;
    }

    get model(): any {
        return this._model;
    }

    @Output('cancel')
    get cancel$(): EventEmitter<void> {
        return this._cancel$;
    }

    @Output('submit')
    get submit$(): EventEmitter<Cpu> {
        return this._submit$;
    }

    // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-empty-function
    ngOnInit(): void {}

    ngOnChanges(changes: any): void {
        if (changes.model && changes.model.currentValue) {
            this._model = changes.model.currentValue;
            this._isUpdateMode = true;
            this._form.patchValue(this._model);
            return;
        }
        this._model = {
            _id: '',
            architecture: [],
            cache: [],
            frequency: {
                base: 0,
                turbo: 0,
            },
            name: '',
            brand: '',
            image: 'https://randomuser.me/api/portraits/lego/6.jpg',
            core: {
                physical: 0,
                thread: 0,
            },
        };
        this._isUpdateMode = false;
        this._form.patchValue(this._model);
    }

    onImageChange(): void {
        // eslint-disable-next-line no-undef
        const element = document.getElementById('image') as HTMLElement & {files: FileList} | null;
        const file = element?.files[0] as File & Blob;
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const fileExtension = file?.name.split('.').pop();
            const base64 = btoa(e);
            this.image = `data:image/${fileExtension};base64,${base64}`;
            this._model.image = this.image;
        };
        reader.readAsArrayBuffer(file);
    }

    cancel(): void {
        this._cancel$.emit();
    }

    submit(cpu: any) {
        const localCpu = cpu;
        localCpu.cache = cpu.cache?.split(' ');
        localCpu.architecture = cpu.architecture?.split(' ');
        this._submit$.emit(localCpu as Cpu);
    }

    private _buildForm(): FormGroup {
        return new FormGroup({
            name: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(2),
            ])),
            brand: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(2),
            ])),
            image: new FormControl(),
            core: new FormGroup({
                physical: new FormControl('', Validators.required),
                thread: new FormControl('', Validators.required),
            }),
            frequency: new FormGroup({
                base: new FormControl('', Validators.required),
                turbo: new FormControl(),
            }),
            cache: new FormControl(),
            architecture: new FormControl(),
        });
    }
}
