import {
    Prop, Schema, SchemaFactory,
} from '@nestjs/mongoose';
import mongoose from 'mongoose';

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
export class Image {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    }) _id: any;

    @Prop({
        type: String,
        required: false,
    }) image: string | null;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
