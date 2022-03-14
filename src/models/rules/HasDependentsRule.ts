import { InsuranceType } from '../InsuranceType';
import { PersonalInformation } from '../PersonalInformation';
import { RiskProfile } from '../RiskProfile';
import { RiskProfileRule } from '../RiskProfileRule';

const hasDependentsRule: RiskProfileRule = ({ dependents }: PersonalInformation, riskProfile: RiskProfile) => {
  if (dependents > 0) {
    const disabilityScore = riskProfile[InsuranceType.DISABILITY];

    if (disabilityScore !== null) {
      riskProfile[InsuranceType.DISABILITY] = disabilityScore + 1;
    }

    const lifeScore = riskProfile[InsuranceType.LIFE];

    if (lifeScore !== null) {
      riskProfile[InsuranceType.LIFE] = lifeScore + 1;
    }
  }
};

export default hasDependentsRule;
