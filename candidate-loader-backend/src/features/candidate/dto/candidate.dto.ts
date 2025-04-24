import { Seniority } from "../entities/seniority.enum";

export class CandidateDto {
      id!: string;
      name!: string;
      surname!: string;
      seniority!: Seniority;
      years!: number;
      availability!: boolean;
}
