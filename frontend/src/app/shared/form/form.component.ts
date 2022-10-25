import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Base64, Cpu } from '../../types/cpu.types';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
})

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
        return this._form;
    }

    @Input()
    set model(value: Cpu) {
        this._model = value;
    }

    get model(): any {
        return this._model;
    }

    get isUpdateMode(): boolean {
        return this._isUpdateMode;
    }

    @Output('cancel')
    get cancel$(): EventEmitter<void> {
        return this._cancel$;
    }

    @Output('submit')
    get submit$(): EventEmitter<Cpu> {
        return this._submit$;
    }

    ngOnInit(): void {}

    ngOnChanges(changes: any): void {
        console.log(changes);
        if (changes.model && changes.model.currentValue) {
            console.log('***** if', changes.model.currentValue);
            this._model = changes.model.currentValue;
            this.image = changes.model.currentValue.image;
            this._isUpdateMode = true;
        } else {
            console.log('***** else', changes.model.currentValue);
            this._model = {
                architecture: '',
                cache: '',
                frequency: {
                    base: 0,
                    turbo: 0,
                },
                name: '',
                brand: '',
                image: '',
                core: {
                    physical: 0,
                    thread: 0,
                },
            };
            this._isUpdateMode = false;
        }
        this._form.patchValue(this._model);
    }

    onImageChange(): void {
        const element = document.getElementById('image') as
            | (HTMLElement & { files: FileList })
            | null;
        const elementImage = document.getElementById('imageDisplay') as any;
        const file = element?.files[0] as File & Blob;
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.image = event.target?.result;
            this._model.image = this.image;
            elementImage.src = this.image;
        };
        reader.readAsDataURL(file);
    }

    cancel(): void {
        this._cancel$.emit();
    }

    submit(cpu: any) {
        const localCpu = cpu;
        localCpu.frequency.base = parseInt(cpu.frequency.base, 10);
        localCpu.frequency.turbo = parseInt(cpu.frequency.turbo, 10);
        localCpu.core.physical = parseInt(cpu.core.physical, 10);
        localCpu.core.thread = parseInt(cpu.core.thread, 10);
        if (!Array.isArray(cpu.architecture)) {
            localCpu.architecture = cpu.architecture.split(',') as Array<string>;
        }
        if (!Array.isArray(cpu.cache)) {
            localCpu.cache = cpu.cache.split(',') as Array<string>;
            localCpu.cache.map((v: string) => parseInt(v, 10));
        }
        localCpu.image = this.image;
        this._submit$.emit(localCpu as Cpu);
    }

    private _buildForm(): FormGroup {
        return new FormGroup({
            _id: new FormControl(),
            name: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(2),
                ]),
            ),
            brand: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(2),
                ]),
            ),
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
