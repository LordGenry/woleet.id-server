import { STRING, ENUM, UUID, UUIDV4, DATE, DOUBLE, CHAR } from 'sequelize';
import { Deferrable } from 'sequelize';

import { UniqueConstraintError } from 'sequelize';
import { DuplicatedUserError } from '../../errors';
import { AbstractInstanceAccess } from './abstract';
import { sequelize } from '../sequelize';
import { Key } from '..';

const UserModel = {
  id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
  type: { type: ENUM(['user', 'admin']), defaultValue: 'user' },
  status: { type: ENUM(['active', 'blocked']), defaultValue: 'active' },
  email: { type: STRING, unique: true },
  username: { type: STRING, unique: true, allowNull: false },
  x500CommonName: { type: STRING, allowNull: false },
  x500Organization: { type: STRING, allowNull: false },
  x500OrganizationalUnit: { type: STRING, allowNull: false },
  x500Locality: { type: STRING, allowNull: false },
  x500Country: { type: STRING, allowNull: false },
  x500UserId: { type: STRING },
  passwordHash: { type: CHAR(1024), allowNull: false },
  passwordSalt: { type: CHAR(256), allowNull: false },
  passwordItrs: { type: DOUBLE, allowNull: false },
  lastLogin: { type: DATE, defaultValue: null }
};

class UserAccess extends AbstractInstanceAccess<InternalUserObject, ApiFullPostUserObject> {

  constructor() {
    super(sequelize);
    this.define('user', UserModel, { paranoid: true });
  }

  async getByUsername(username: string): Promise<SequelizeUserObject> {
    return this.model.findOne({ where: { username } });
  }

  async getByEmail(email: string): Promise<SequelizeUserObject> {
    return this.model.findOne({ where: { email } });
  }

  handleError(err: any) {
    if (err instanceof UniqueConstraintError) {
      const field = Object.keys(err['fields']);
      throw new DuplicatedUserError(`Duplicated field ${field}`, err);
    }
  }

}

export const User = new UserAccess();