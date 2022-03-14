import fastify from 'fastify';
import { RiskProfileController } from '../../controllers/riskProfileController';
import { PersonalInformation } from '../../models/PersonalInformation';
import riskProfileBuild from '../riskProfileRouter';

const controller: RiskProfileController = {
  postRiskProfile: jest.fn(async (_, res) => {
    res.send();
  }),
};

const routes = riskProfileBuild(controller);

const server = fastify();

server.register(routes);

describe('riskProfileRouter', () => {
  describe('postRiskProfile', () => {
    test('age should be integer & equal or greater than 0', async () => {
      let payload: PersonalInformation = {
        age: -1,
        dependents: 0,
        income: 0,
        marital_status: 'married',
        risk_questions: [0, 0, 0],
      };

      let res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      let response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.age should be >= 0`);

      payload = {
        age: 1.2,
        dependents: 0,
        income: 0,
        marital_status: 'married',
        risk_questions: [0, 0, 0],
      };

      res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.age should be integer`);
    });

    test('dependents should be integer & equal or greater than 0', async () => {
      let payload: PersonalInformation = {
        age: 50,
        dependents: -1,
        income: 0,
        marital_status: 'married',
        risk_questions: [0, 0, 0],
      };

      let res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      let response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.dependents should be >= 0`);

      payload = {
        age: 45,
        dependents: 1.5,
        income: 0,
        marital_status: 'married',
        risk_questions: [0, 0, 0],
      };

      res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.dependents should be integer`);
    });

    test('income should be integer & equal or greater than 0', async () => {
      let payload: PersonalInformation = {
        age: 25,
        dependents: 1,
        income: -100,
        marital_status: 'married',
        risk_questions: [0, 0, 0],
      };

      let res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      let response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.income should be >= 0`);

      payload = {
        age: 34,
        dependents: 1,
        income: 10.95,
        marital_status: 'married',
        risk_questions: [0, 0, 0],
      };

      res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.income should be integer`);
    });

    test(`marital_status should be equal 'married' or 'single'`, async () => {
      const payload: any = {
        age: 45,
        dependents: 1,
        income: 1000,
        marital_status: 'marrid',
        risk_questions: [0, 0, 0],
      };

      const res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      const response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.marital_status should be equal to one of the allowed values`);
    });

    test('risk_questions should have AT LEAST 3 items', async () => {
      const payload: PersonalInformation = {
        age: 45,
        dependents: 1,
        income: 1000,
        marital_status: 'married',
        risk_questions: [0, 0],
      };

      const res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      const response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.risk_questions should NOT have fewer than 3 items`);
    });

    test('risk_questions should have AT MOST 3 items', async () => {
      const payload: PersonalInformation = {
        age: 45,
        dependents: 1,
        income: 1000,
        marital_status: 'married',
        risk_questions: [0, 0, 0, 0],
      };

      const res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      const response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.risk_questions should NOT have more than 3 items`);
    });

    test('risk_questions should be compose by binaries', async () => {
      let payload: PersonalInformation = {
        age: 45,
        dependents: 1,
        income: 1000,
        marital_status: 'married',
        risk_questions: [0, 0, 2],
      };

      let res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      let response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.risk_questions[2] should be <= 1`);

      payload = {
        age: 45,
        dependents: 1,
        income: 1000,
        marital_status: 'married',
        risk_questions: [0, 0, -1],
      };

      res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.risk_questions[2] should be >= 0`);
    });

    test('if house, should have ownership_status', async () => {
      const payload: any = {
        age: 45,
        dependents: 1,
        income: 1000,
        marital_status: 'married',
        risk_questions: [0, 0, 1],
        house: {
          wrong_field: 1,
        },
      };

      const res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      const response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.house should have required property 'ownership_status'`);
    });

    test(`ownership_status should be 'owned' or 'mortgaged'`, async () => {
      const payload: any = {
        age: 45,
        dependents: 1,
        income: 1000,
        marital_status: 'married',
        risk_questions: [0, 0, 1],
        house: {
          ownership_status: 'rented',
        },
      };

      const res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      const response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.house.ownership_status should be equal to one of the allowed values`);
    });

    test('if vehicle, should have year', async () => {
      const payload: any = {
        age: 45,
        dependents: 1,
        income: 1000,
        marital_status: 'married',
        risk_questions: [0, 0, 1],
        vehicle: {
          wrong_field: 1,
        },
      };

      const res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      const response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.vehicle should have required property 'year'`);
    });

    test(`year should be integer & equal or greater than 0`, async () => {
      const payload: PersonalInformation = {
        age: 45,
        dependents: 1,
        income: 1000,
        marital_status: 'married',
        risk_questions: [0, 0, 1],
        vehicle: {
          year: -1,
        },
      };

      const res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      const response = JSON.parse(res.payload) as { message: string };

      expect(response.message).toEqual(`body.vehicle.year should be >= 0`);
    });

    test('valid input should not emit error', async () => {
      const payload: PersonalInformation = {
        age: 45,
        dependents: 1,
        income: 1000,
        marital_status: 'married',
        risk_questions: [0, 0, 1],
        house: {
          ownership_status: 'mortgaged',
        },
        vehicle: {
          year: 2000,
        },
      };

      const res = await server.inject({
        method: 'POST',
        url: '/risk-profiles',
        payload: payload,
      });

      expect(res.statusCode).toEqual(200);
    });
  });
});
