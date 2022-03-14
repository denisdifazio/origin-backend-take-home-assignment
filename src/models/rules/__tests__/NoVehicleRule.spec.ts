import { PersonalInformation } from '../../PersonalInformation';
import { RiskProfile } from '../../RiskProfile';
import noVehicleRule from '../NoVehicleRule';

describe('noVehicleRule', () => {
  test('if no vehicle, should return auto insurance as null', () => {
    const personalInformation: PersonalInformation = {
      age: 20,
      income: 0,
      dependents: 0,
      marital_status: 'single',
      risk_questions: [1, 1, 1],
    };

    const riskProfile: RiskProfile = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
    };

    noVehicleRule(personalInformation, riskProfile);

    expect(riskProfile.auto).toBeNull();
    expect(riskProfile.disability).toEqual(0);
    expect(riskProfile.home).toEqual(0);
    expect(riskProfile.life).toEqual(0);
  });
});
