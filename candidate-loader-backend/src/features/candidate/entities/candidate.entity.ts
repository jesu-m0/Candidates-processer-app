import { Seniority } from "./seniority.enum";

export class Candidate {
      id!: string;
      name!: string;
      surname!: string;
      seniority!: Seniority;
      years!: number;
      availability!: boolean;
}