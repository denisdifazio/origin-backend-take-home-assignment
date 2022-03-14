import { PersonalInformation } from '../models/PersonalInformation';
import { RiskProfile } from '../models/RiskProfile';
import { RiskProfileLeveled } from '../models/RiskProfileLeveled';
import { RiskProfileRule } from '../models/RiskProfileRule';
import { InsuranceType } from '../models/InsuranceType';
import { InsuranceLevel } from '../models/InsuranceLevel';

const translateRiskProfile = (riskProfile: RiskProfile): RiskProfileLeveled => {
  const translatedRiskProfile: RiskProfileLeveled = {
    auto: InsuranceLevel.INELIGIBLE,
    disability: InsuranceLevel.INELIGIBLE,
    home: InsuranceLevel.INELIGIBLE,
    life: InsuranceLevel.INELIGIBLE,
  };

  for (const insurance of Object.keys(riskProfile) as InsuranceType[]) {
    const score = riskProfile[insurance];

    if (score === null) {
      translatedRiskProfile[insurance] = InsuranceLevel.INELIGIBLE;
    } else if (score <= 0) {
      translatedRiskProfile[insurance] = InsuranceLevel.ECONOMIC;
    } else if (score >= 1 && score <= 2) {
      translatedRiskProfile[insurance] = InsuranceLevel.REGULAR;
    } else {
      translatedRiskProfile[insurance] = InsuranceLevel.RESPONSIBLE;
    }
  }

  return translatedRiskProfile;
};

const buildRiskProfile =
  (rules: RiskProfileRule[]) =>
  (personalInformation: PersonalInformation): RiskProfileLeveled => {
    const baseScore = personalInformation.risk_questions.reduce((sum, current) => sum + current, 0);

    const riskProfile: RiskProfile = {
      auto: baseScore,
      disability: baseScore,
      home: baseScore,
      life: baseScore,
    };

    for (const rule of rules) {
      rule(personalInformation, riskProfile);
    }

    return translateRiskProfile(riskProfile);
  };

export default function create(rules: RiskProfileRule[]): RiskProfileService {
  return {
    buildRiskProfile: buildRiskProfile(rules),
  };
}

export interface RiskProfileService {
  buildRiskProfile: ReturnType<typeof buildRiskProfile>;
}
