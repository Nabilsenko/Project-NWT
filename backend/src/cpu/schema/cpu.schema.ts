import {
    Prop, raw, Schema, SchemaFactory,
} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Core } from '../../types/cpu.types';

@Schema({
    toJSON: {
        virtuals: true,
        transform: (dpc: any, ret: any) => {
            // eslint-disable-next-line no-param-reassign,no-underscore-dangle
            delete ret._id;
        },
    },
    versionKey: false,

})
export class Cpu {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    }) _id: any;

    @Prop({
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    }) name: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    }) brand: string;

    @Prop({
        type: [String],
        required: true,
    }) architecture: string[];

    @Prop({
        type: String,
        required: false,
    }) image: string | null;

    @Prop(raw({
        physical: {
            type: Number,
            required: true,
        },
        thread: {
            type: Number,
            required: true,
        },
    })) core: Core;

    @Prop(raw({
        base: {
            type: Number,
            required: true,
        },
        turbo: {
            type: Number,
            required: false,
        },
    })) frequency: Core;

    @Prop({
        type: [Number],
        required: true,
    }) cache: number[];
}

export const CpuSchema = SchemaFactory.createForClass(Cpu);

CpuSchema.index({ name: 1 }, { unique: true });
