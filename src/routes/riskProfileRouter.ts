import { FastifyInstance } from 'fastify';
import { RiskProfileController } from '../controllers/riskProfileController';
import * as schemas from './schemas/riskProfileSchema';

const buildRoutes = (controller: RiskProfileController) => async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/risk-profiles',
    schema: schemas.postRiskProfile,
    handler: controller.postRiskProfile,
  });
};

export default function create(controller: RiskProfileController) {
  return buildRoutes(controller);
}
