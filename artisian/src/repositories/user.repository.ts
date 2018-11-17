import { DefaultCrudRepository, juggler, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { User, Client } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';
import { ClientRepository } from './client.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {
  public clients: HasManyRepositoryFactory<Client, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository(ClientRepository) protected clientRepository: ClientRepository,
  ) {
    super(User, dataSource);
    this.clients = this._createHasManyRepositoryFactoryFor(
      'clients',
      async () => clientRepository,
    );
  }

  createAccessToken() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}
