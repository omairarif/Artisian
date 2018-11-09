import {Entity, model, property} from '@loopback/repository';

@model()
export class Has_skill extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  artist_id?: number;

  @property({
    type: 'number',
  })
  skill_id?: number;

  constructor(data?: Partial<Has_skill>) {
    super(data);
  }
}
