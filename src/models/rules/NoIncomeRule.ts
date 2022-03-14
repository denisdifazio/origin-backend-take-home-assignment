import { InsuranceType } from '../InsuranceType';
import { PersonalInformation } from '../PersonalInformation';
import { RiskProfile } from '../RiskProfile';
import { RiskProfileRule } from '../RiskProfileRule';

const noIncomeRule: RiskProfileRule = ({ income }: PersonalInformation, riskProfile: RiskProfile) => {
  if (income === 0) {
    riskProfile[InsuranceType.DISABILITY] = null;
  }
};

export default noIncomeRule;
