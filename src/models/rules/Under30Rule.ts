import { InsuranceType } from '../InsuranceType';
import { PersonalInformation } from '../PersonalInformation';
import { RiskProfile } from '../RiskProfile';
import { RiskProfileRule } from '../RiskProfileRule';

const under30Rule: RiskProfileRule = ({ age }: PersonalInformation, riskProfile: RiskProfile) => {
  if (age < 30) {
    for (const insurance of Object.keys(riskProfile) as InsuranceType[]) {
      const score = riskProfile[insurance];

      if (score !== null) {
        riskProfile[insurance] = score - 2;
      }
    }
  }
};

export default under30Rule;
