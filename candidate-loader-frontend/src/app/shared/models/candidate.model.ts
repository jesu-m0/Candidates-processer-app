import { Seniority } from "./seniority.enum";

export interface Candidate {
      name: string;
      surname: string;
      seniority: Seniority;
      years: number;
      availability: boolean;
}