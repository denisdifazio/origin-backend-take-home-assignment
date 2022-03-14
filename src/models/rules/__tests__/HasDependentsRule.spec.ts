import { PersonalInformation } from '../../PersonalInformation';
import { RiskProfile } from '../../RiskProfile';
import hasDependentsRule from '../HasDependentsRule';

describe('hasDependentsRule', () => {
  test('if dependents > 1, should add 1 risk point to life and disability insurances', () => {
    const personalInformation: PersonalInformation = {
      age: 50,
      income: 1000,
      dependents: 1,
      marital_status: 'single',
      risk_questions: [1, 1, 1],
    };

    const riskProfile: RiskProfile = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
    };

    hasDependentsRule(personalInformation, riskProfile);

    expect(riskProfile.life).toEqual(1);
    expect(riskProfile.disability).toEqual(1);
    expect(riskProfile.auto).toEqual(0);
    expect(riskProfile.home).toEqual(0);
  });
});
