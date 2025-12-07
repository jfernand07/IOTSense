import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantTypeDto } from './create-plant-type.dto';

export class UpdatePlantTypeDto extends PartialType(CreatePlantTypeDto) {}
