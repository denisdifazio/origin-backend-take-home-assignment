import { PersonalInformation } from './PersonalInformation';
import { RiskProfile } from './RiskProfile';

export type RiskProfileRule = (personalInformation: PersonalInformation, riskProfile: RiskProfile) => void;
