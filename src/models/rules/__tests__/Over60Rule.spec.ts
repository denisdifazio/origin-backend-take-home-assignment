import { PersonalInformation } from '../../PersonalInformation';
import { RiskProfile } from '../../RiskProfile';
import over60Rule from '../Over60Rule';

describe('over60Rule', () => {
  test('if age > 60, should return disability and life insurances as null', () => {
    const personalInformation: PersonalInformation = {
      age: 61,
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

    over60Rule(personalInformation, riskProfile);

    expect(riskProfile.life).toBeNull();
    expect(riskProfile.disability).toBeNull();
    expect(riskProfile.home).toEqual(0);
    expect(riskProfile.auto).toEqual(0);
  });
});
