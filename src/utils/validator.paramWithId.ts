import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

class ParamsWithId {
  @IsMongoId()
  id: ObjectId;
}

export default ParamsWithId;
