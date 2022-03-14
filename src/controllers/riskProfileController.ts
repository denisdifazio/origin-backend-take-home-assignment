import { FastifyReply, FastifyRequest } from 'fastify';
import { PersonalInformation } from '../models/PersonalInformation';
import { RiskProfileService } from '../services/riskProfileService';

const postRiskProfile = (service: RiskProfileService) => async (req: FastifyRequest, res: FastifyReply) => {
  const personalInformation = req.body as PersonalInformation;

  const riskProfile = await service.buildRiskProfile(personalInformation);

  res.send(riskProfile);
};

export default function create(service: RiskProfileService): RiskProfileController {
  return {
    postRiskProfile: postRiskProfile(service),
  };
}

export interface RiskProfileController {
  postRiskProfile: ReturnType<typeof postRiskProfile>;
}
