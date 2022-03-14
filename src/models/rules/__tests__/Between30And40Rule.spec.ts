import { PersonalInformation } from '../../PersonalInformation';
import { RiskProfile } from '../../RiskProfile';
import between30And40Rule from '../Between30And40Rule';

describe('between30And40Rule', () => {
  test('if age >= 30 and <= 40, should deduct 1 risk points from all lines of insurance', () => {
    const personalInformation: PersonalInformation = {
      age: 30,
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

    between30And40Rule(personalInformation, riskProfile);

    expect(riskProfile.life).toEqual(-1);
    expect(riskProfile.auto).toEqual(-1);
    expect(riskProfile.home).toEqual(-1);
    expect(riskProfile.disability).toEqual(-1);
  });
});
