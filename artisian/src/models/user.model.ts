import { Entity, model, property, hasMany } from '@loopback/repository';
import { Client } from './client.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
  })
  last_name?: string;

  @property({
    type: 'string',
  })
  access_token?: string;

  @property({
    type: 'number',
  })
  user_type?: string;

  @hasMany(() => Client, { keyTo: 'fk_user' })
  clients?: Client[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}
