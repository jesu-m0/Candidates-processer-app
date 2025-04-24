export enum Seniority {
      Junior = 'junior',
      Senior = 'senior',
}

export function isSeniority(value: any): value is Seniority {
      return Object.values(Seniority).includes(value);
}