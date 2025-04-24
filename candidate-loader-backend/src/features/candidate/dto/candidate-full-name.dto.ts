import { IsString } from 'class-validator';

export class CandidateFullName {
  @IsString() name!: string;
  @IsString() surname!: string;
}