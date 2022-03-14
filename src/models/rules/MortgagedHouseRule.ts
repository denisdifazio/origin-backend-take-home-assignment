import { InsuranceType } from '../InsuranceType';
import { PersonalInformation } from '../PersonalInformation';
import { RiskProfile } from '../RiskProfile';
import { RiskProfileRule } from '../RiskProfileRule';

const mortgagedHouseRule: RiskProfileRule = ({ house }: PersonalInformation, riskProfile: RiskProfile) => {
  if (house && house.ownership_status === 'mortgaged') {
    const homeScore = riskProfile[InsuranceType.HOME];

    if (homeScore !== null) {
      riskProfile[InsuranceType.HOME] = homeScore + 1;
    }

    const disabilityScore = riskProfile[InsuranceType.DISABILITY];

    if (disabilityScore !== null) {
      riskProfile[InsuranceType.DISABILITY] = disabilityScore + 1;
    }
  }
};

export default mortgagedHouseRule;
