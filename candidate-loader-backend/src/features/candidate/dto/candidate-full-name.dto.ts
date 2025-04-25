import { IsString } from 'class-validator';

export class CandidateFullNameDto {
  @IsString() name!: string;
  @IsString() surname!: string;
}