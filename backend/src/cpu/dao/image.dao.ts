import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { Image } from '../schema/image.schema';
import CreateImageDto from '../dto/create-image.dto';

@Injectable()
export default class ImageDao {

    constructor(@InjectModel(Image.name) private _imageModel: Model<Image>) {}

    findById(id: string): Observable<Image | void> {
        return from(this._imageModel.findById(id).lean()) as Observable<Image | void>;
    }

    save(imageDto: CreateImageDto): Observable<Image> {
        return from(new this._imageModel(imageDto).save());
    }

    update(
        id: string,
        image: string,
    ): Observable<Image> {
        return from(
            this._imageModel.findByIdAndUpdate(id, { image }, {
                new: true,
                runValidators: true,
            }),
        ) as Observable<Image>;
    }
}
