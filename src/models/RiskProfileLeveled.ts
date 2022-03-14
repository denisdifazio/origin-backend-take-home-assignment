import { InsuranceType } from './InsuranceType';
import { InsuranceLevel } from './InsuranceLevel';

export type RiskProfileLeveled = Record<InsuranceType, InsuranceLevel>;
