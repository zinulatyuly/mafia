import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Helper } from '../helper';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}

  async checkUser(body): Promise<User> {
    return this.userModel.findOne(body);
  }

  async createUser(body): Promise<User> {
    const user = new User();
    user.name = body.name;
    user.token = Helper.randomString(18);
    return await this.userModel.save(user);
  }

  /*
  async editUser(userID, createUserDTO: CreateUserDTO): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userID, createUserDTO, { new: true });
  }

  async deleteUser(userID): Promise<any> {
    return this.userModel.findByIdAndRemove(userID);
  }*/

}
