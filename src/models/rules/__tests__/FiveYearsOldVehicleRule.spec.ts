import { PersonalInformation } from '../../PersonalInformation';
import { RiskProfile } from '../../RiskProfile';
import fiveYearsOldVehicleRule from '../FiveYearsOldVehicleRule';

describe('fiveYearsOldVehicleRule', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 0, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test(`if currentDate - vehicle.year <= 5, should add 1 risk point to auto insurances`, () => {
    const personalInformation: PersonalInformation = {
      age: 50,
      income: 1000,
      dependents: 1,
      marital_status: 'married',
      risk_questions: [1, 1, 1],
      vehicle: {
        year: 2017,
      },
    };

    const riskProfile: RiskProfile = {
      auto: 0,
      disability: 0,
      home: 0,
      life: 0,
    };

    fiveYearsOldVehicleRule(personalInformation, riskProfile);

    expect(riskProfile.auto).toEqual(1);
    expect(riskProfile.life).toEqual(0);
    expect(riskProfile.disability).toEqual(0);
    expect(riskProfile.home).toEqual(0);
  });
});
