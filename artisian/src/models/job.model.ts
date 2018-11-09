import {Entity, model, property} from '@loopback/repository';

@model()
export class Job extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  client_id?: number;

  @property({
    type: 'string',
  })
  duration?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
  })
  amount?: number;

  @property({
    type: 'number',
  })
  skill_id?: number;

  constructor(data?: Partial<Job>) {
    super(data);
  }
}