import {Entity, model, property} from '@loopback/repository';

@model()
export class Artist extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  created_date?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  about?: string;

  @property({
    type: 'number',
  })
  user_id?: number;

  constructor(data?: Partial<Artist>) {
    super(data);
  }
}