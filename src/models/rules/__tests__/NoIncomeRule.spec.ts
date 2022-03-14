import { PersonalInformation } from '../../PersonalInformation';
import { RiskProfile } from '../../RiskProfile';
import noIncomeRule from '../NoIncomeRule';

describe('noIncomeRule', () => {
  test('if no income, should return disability insurance as null', () => {
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

    noIncomeRule(personalInformation, riskProfile);

    expect(riskProfile.disability).toBeNull();
    expect(riskProfile.auto).toEqual(0);
    expect(riskProfile.home).toEqual(0);
    expect(riskProfile.life).toEqual(0);
  });
});
