import { InsuranceType } from '../InsuranceType';
import { PersonalInformation } from '../PersonalInformation';
import { RiskProfile } from '../RiskProfile';
import { RiskProfileRule } from '../RiskProfileRule';

const over60Rule: RiskProfileRule = ({ age }: PersonalInformation, riskProfile: RiskProfile) => {
  if (age > 60) {
    riskProfile[InsuranceType.LIFE] = null;
    riskProfile[InsuranceType.DISABILITY] = null;
  }
};

export default over60Rule;
