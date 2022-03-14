import { InsuranceType } from '../InsuranceType';
import { PersonalInformation } from '../PersonalInformation';
import { RiskProfile } from '../RiskProfile';
import { RiskProfileRule } from '../RiskProfileRule';

const isMarriedRule: RiskProfileRule = ({ marital_status }: PersonalInformation, riskProfile: RiskProfile) => {
  if (marital_status === 'married') {
    const lifeScore = riskProfile[InsuranceType.LIFE];

    if (lifeScore !== null) {
      riskProfile[InsuranceType.LIFE] = lifeScore + 1;
    }

    const disabilityScore = riskProfile[InsuranceType.DISABILITY];

    if (disabilityScore !== null) {
      riskProfile[InsuranceType.DISABILITY] = disabilityScore - 1;
    }
  }
};

export default isMarriedRule;
