import { PersonalInformation } from '../../models/PersonalInformation';
import riskProfileServiceBuild from '../riskProfileService';
import between30And40Rule from '../../models/rules/Between30And40Rule';
import fiveYearsOldVehicleRule from '../../models/rules/FiveYearsOldVehicleRule';
import hasDependentsRule from '../../models/rules/HasDependentsRule';
import highIncomeRule from '../../models/rules/HighIncomeRule';
import isMarriedRule from '../../models/rules/IsMarriedRule';
import mortgagedHouseRule from '../../models/rules/MortgagedHouseRule';
import noHouseRule from '../../models/rules/NoHouseRule';
import noIncomeRule from '../../models/rules/NoIncomeRule';
import noVehicleRule from '../../models/rules/NoVehicleRule';
import over60Rule from '../../models/rules/Over60Rule';
import under30Rule from '../../models/rules/Under30Rule';
import { InsuranceLevel } from '../../models/InsuranceLevel';

const rules = [
  between30And40Rule,
  fiveYearsOldVehicleRule,
  hasDependentsRule,
  highIncomeRule,
  isMarriedRule,
  mortgagedHouseRule,
  noHouseRule,
  noIncomeRule,
  noVehicleRule,
  over60Rule,
  under30Rule,
];

const service = riskProfileServiceBuild(rules);

describe('riskProfileService', () => {
  test('execute rules [over60Rule, isMarriedRule, noVehicleRule]', () => {
    const personalInformation: PersonalInformation = {
      age: 61,
      income: 1000,
      dependents: 0,
      marital_status: 'married',
      risk_questions: [1, 1, 1],
      house: {
        ownership_status: 'owned',
      },
    };

    const riskProfile = service.buildRiskProfile(personalInformation);

    expect(riskProfile.life).toEqual(InsuranceLevel.INELIGIBLE);
    expect(riskProfile.auto).toEqual(InsuranceLevel.INELIGIBLE);
    expect(riskProfile.home).toEqual(InsuranceLevel.RESPONSIBLE);
    expect(riskProfile.disability).toEqual(InsuranceLevel.INELIGIBLE);
  });

  test('execute rules [between30And40Rule, highIncomeRule, hasDependentsRule, isMarriedRule, fiveYearsOldVehicleRule, mortgagedHouseRule]', () => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 0, 1));

    const personalInformation: PersonalInformation = {
      age: 35, //  all - 1
      income: 200_001, // all - 1
      dependents: 1, // life + 1 & disability + 1
      marital_status: 'married', // life + 1 & disability - 1
      risk_questions: [1, 1, 1],
      house: {
        ownership_status: 'mortgaged', // home + 1 & disability + 1
      },
      vehicle: {
        year: 2015, // auto + 1
      },
    };

    // life 3
    // auto 2
    // disability 2
    // home 2

    const riskProfile = service.buildRiskProfile(personalInformation);

    expect(riskProfile.life).toEqual(InsuranceLevel.RESPONSIBLE);
    expect(riskProfile.auto).toEqual(InsuranceLevel.REGULAR);
    expect(riskProfile.home).toEqual(InsuranceLevel.REGULAR);
    expect(riskProfile.disability).toEqual(InsuranceLevel.REGULAR);

    jest.useRealTimers();
  });
});
