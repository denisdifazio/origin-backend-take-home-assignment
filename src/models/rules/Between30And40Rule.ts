import { InsuranceType } from '../InsuranceType';
import { PersonalInformation } from '../PersonalInformation';
import { RiskProfile } from '../RiskProfile';
import { RiskProfileRule } from '../RiskProfileRule';

const between30And40Rule: RiskProfileRule = ({ age }: PersonalInformation, riskProfile: RiskProfile) => {
  if (age >= 30 && age <= 40) {
    for (const insurance of Object.keys(riskProfile) as InsuranceType[]) {
      const score = riskProfile[insurance];

      if (score !== null) {
        riskProfile[insurance] = score - 1;
      }
    }
  }
};

export default between30And40Rule;
