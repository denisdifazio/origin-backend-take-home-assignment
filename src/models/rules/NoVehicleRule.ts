import { InsuranceType } from '../InsuranceType';
import { PersonalInformation } from '../PersonalInformation';
import { RiskProfile } from '../RiskProfile';
import { RiskProfileRule } from '../RiskProfileRule';

const noVehicleRule: RiskProfileRule = ({ vehicle }: PersonalInformation, riskProfile: RiskProfile) => {
  if (!vehicle) {
    riskProfile[InsuranceType.AUTO] = null;
  }
};

export default noVehicleRule;
