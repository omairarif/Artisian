import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import { User, Client, Artist } from '../models';
import { UserRepository, ClientRepository, ArtistRepository } from '../repositories';

import * as isemail from 'isemail';
import { inject } from '@loopback/core';


export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
  ) { }

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { 'x-ts-type': User } },
      },
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.count(where);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': User } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter,
  ): Promise<User[]> {
    const users = await this.userRepository.find(filter);
    users.forEach(user => {
      delete user.password;
    })
    return users;
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { 'x-ts-type': User } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<User> {
    const users = await (this.userRepository.find({ where: { id: id }, limit: 1, fields: { password: false } }));
    return users[0];
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'User  success',
      },
    },
  })
  async login(@requestBody() body: any): Promise<any> {
    const email = String(body.email);
    const password = String(body.password);

    if (!isemail.validate(email)) {
      throw new HttpErrors.UnprocessableEntity('invalid email');
    }
    const users = await (this.userRepository.find({ where: { email: email, password: password }, limit: 1, fields: { password: false } }));
    const user = users[0];
    if (users.length == 0) {
      return {
        "result": "either email or password is incorrect"
      }
    }
    user.access_token = this.userRepository.createAccessToken();
    delete user.password;
    await this.userRepository.update(user);

    console.log("user type " + user.user_type + " condition" + (parseInt(user.user_type || "0") === 0));
    if (parseInt(user.user_type || "0") === 0) {
      const clients = await this.clientRepository.find({ where: { user_id: user.id }, limit: 1 })
      return {
        "user": user,
        "client": clients
      }
    } else {
      return user;
    }
  }

}


