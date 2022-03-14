import { PersonalInformation } from '../../PersonalInformation';
import { RiskProfile } from '../../RiskProfile';
import mortgagedHouseRule from '../MortgagedHouseRule';

describe('mortgagedHouseRule', () => {
  test('if house is mortgaged, should add 1 risk points to home and disability insurances', () => {
    const personalInformation: PersonalInformation = {
      age: 50,
      income: 1000,
      dependents: 0,
      marital_status: 'single',
      risk_questions: [1, 1, 1],
      house: {
        ownership_status: 'mortgaged',
      },
    };

    const riskProfile: RiskProfile = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
    };

    mortgagedHouseRule(personalInformation, riskProfile);

    expect(riskProfile.home).toEqual(1);
    expect(riskProfile.disability).toEqual(1);
    expect(riskProfile.auto).toEqual(0);
    expect(riskProfile.life).toEqual(0);
  });
});
