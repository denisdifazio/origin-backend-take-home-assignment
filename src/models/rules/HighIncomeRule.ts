import { InsuranceType } from '../InsuranceType';
import { PersonalInformation } from '../PersonalInformation';
import { RiskProfile } from '../RiskProfile';
import { RiskProfileRule } from '../RiskProfileRule';

const highIncomeRule: RiskProfileRule = ({ income }: PersonalInformation, riskProfile: RiskProfile) => {
  if (income > 200_000) {
    for (const insurance of Object.keys(riskProfile) as InsuranceType[]) {
      const score = riskProfile[insurance];

      if (score !== null) {
        riskProfile[insurance] = score - 1;
      }
    }
  }
};

export default highIncomeRule;
