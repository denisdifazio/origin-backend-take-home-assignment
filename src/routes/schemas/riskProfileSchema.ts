import { OpenApiSchema } from './types/OpenApiSchema';
import S from 'fluent-json-schema';

export const postRiskProfile: OpenApiSchema = {
  tags: ['risk profile'],
  description: 'Generate a risk profile based on personal user information',
  body: S.object()
    .prop('age', S.integer().minimum(0).required())
    .prop('dependents', S.integer().minimum(0).required())
    .prop('house', S.object().prop('ownership_status', S.enum(['owned', 'mortgaged']).required()))
    .prop('income', S.integer().minimum(0).required())
    .prop('marital_status', S.enum(['single', 'married']).required())
    .prop('risk_questions', S.array().items(S.integer().minimum(0).maximum(1)).minItems(3).maxItems(3))
    .prop('vehicle', S.object().prop('year', S.integer().minimum(0).required())),
};
