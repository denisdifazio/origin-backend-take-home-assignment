import { PersonalInformation } from '../../PersonalInformation';
import { RiskProfile } from '../../RiskProfile';
import under30Rule from '../Under30Rule';

describe('under30Rule', () => {
  test('if age < 30, should deduct 2 risk points from all lines of insurance', () => {
    const personalInformation: PersonalInformation = {
      age: 29,
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

    under30Rule(personalInformation, riskProfile);

    expect(riskProfile.life).toEqual(-2);
    expect(riskProfile.auto).toEqual(-2);
    expect(riskProfile.home).toEqual(-2);
    expect(riskProfile.disability).toEqual(-2);
  });
});
