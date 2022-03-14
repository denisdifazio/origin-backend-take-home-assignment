import { PersonalInformation } from '../../PersonalInformation';
import { RiskProfile } from '../../RiskProfile';
import highIncomeRule from '../HighIncomeRule';

describe('highIncomeRule', () => {
  test('if income > 200 000, should deduct 1 risk points from all lines of insurance', () => {
    const personalInformation: PersonalInformation = {
      age: 50,
      income: 200_001,
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

    highIncomeRule(personalInformation, riskProfile);

    expect(riskProfile.life).toEqual(-1);
    expect(riskProfile.auto).toEqual(-1);
    expect(riskProfile.home).toEqual(-1);
    expect(riskProfile.disability).toEqual(-1);
  });
});
