import { InsuranceType } from './InsuranceType';

export type RiskProfile = Record<InsuranceType, number | null>;
