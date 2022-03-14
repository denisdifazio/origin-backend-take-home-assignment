import { InsuranceType } from '../InsuranceType';
import { PersonalInformation } from '../PersonalInformation';
import { RiskProfile } from '../RiskProfile';
import { RiskProfileRule } from '../RiskProfileRule';

const noHouseRule: RiskProfileRule = ({ house }: PersonalInformation, riskProfile: RiskProfile) => {
  if (!house) {
    riskProfile[InsuranceType.HOME] = null;
  }
};

export default noHouseRule;
