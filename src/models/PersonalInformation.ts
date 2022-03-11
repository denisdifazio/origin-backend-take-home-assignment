export interface PersonalInformation {
  age: number; // integer equal or greater than 0
  dependents: number; // integer equal or greater than 0
  house?: {
    ownership_status: 'owned' | 'mortgaged';
  };
  income: number; // integer equal or greater than 0
  marital_status: 'single' | 'married';
  risk_questions: number[]; // array of binaries with max length of 3
  vehicle?: {
    year: number;
  };
}
