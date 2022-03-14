import { InsuranceType } from '../InsuranceType';
import { PersonalInformation } from '../PersonalInformation';
import { RiskProfile } from '../RiskProfile';
import { RiskProfileRule } from '../RiskProfileRule';

const fiveYearsOldVehicleRule: RiskProfileRule = ({ vehicle }: PersonalInformation, riskProfile: RiskProfile) => {
  if (vehicle && new Date().getFullYear() - vehicle.year <= 5) {
    const score = riskProfile[InsuranceType.AUTO];

    if (score !== null) {
      riskProfile[InsuranceType.AUTO] = score + 1;
    }
  }
};

export default fiveYearsOldVehicleRule;
