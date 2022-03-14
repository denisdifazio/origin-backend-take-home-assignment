import fastify from 'fastify';
import oas from 'fastify-oas';
import riskProfileServiceBuild from './services/riskProfileService';
import riskProfileControllerBuild from './controllers/riskProfileController';
import riskProfileRouterBuild from './routes/riskProfileRouter';
import between30And40Rule from './models/rules/Between30And40Rule';
import fiveYearsOldVehicleRule from './models/rules/FiveYearsOldVehicleRule';
import hasDependentsRule from './models/rules/HasDependentsRule';
import highIncomeRule from './models/rules/HighIncomeRule';
import isMarriedRule from './models/rules/IsMarriedRule';
import mortgagedHouseRule from './models/rules/MortgagedHouseRule';
import noHouseRule from './models/rules/NoHouseRule';
import noIncomeRule from './models/rules/NoIncomeRule';
import noVehicleRule from './models/rules/NoVehicleRule';
import over60Rule from './models/rules/Over60Rule';
import under30Rule from './models/rules/Under30Rule';

export default async function create() {
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

  const riskProfileService = riskProfileServiceBuild(rules);
  const riskProfileController = riskProfileControllerBuild(riskProfileService);
  const riskProfileRouter = riskProfileRouterBuild(riskProfileController);

  const server = fastify();

  // oas must be first to be registered
  server.register(oas, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'Risk Profile API',
      },
      consumes: ['application/json'],
      servers: [],
      tags: [{ name: 'risk profile', desc: 'Endpoints related to risk profiles' }],
    },
    exposeRoute: true,
  });

  server.register(riskProfileRouter);

  await server.ready();

  server.oas();

  return server;
}
