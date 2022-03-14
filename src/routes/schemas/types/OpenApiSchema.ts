import { FastifySchema } from 'fastify';

export interface OpenApiSchema extends FastifySchema {
  tags?: string[];
  description?: string;
  hide?: boolean;
}
