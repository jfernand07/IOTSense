import { PartialType } from '@nestjs/mapped-types';
import { CreateReadingDto } from './create-reading.dto';

export class UpdateReadingDto extends PartialType(CreateReadingDto) {}
