import { PersonalInformation } from '../../PersonalInformation';
import { RiskProfile } from '../../RiskProfile';
import noHouseRule from '../NoHouseRule';

describe('noHouseRule', () => {
  test('if no house, should return home insurance as null', () => {
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

    noHouseRule(personalInformation, riskProfile);

    expect(riskProfile.home).toBeNull();
    expect(riskProfile.auto).toEqual(0);
    expect(riskProfile.disability).toEqual(0);
    expect(riskProfile.life).toEqual(0);
  });
});
