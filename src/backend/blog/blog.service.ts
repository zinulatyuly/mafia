import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class BlogService {

  constructor(
    @InjectRepository(User)
    private readonly taskModel: Repository<User>,
  ) {}

  async getTasks(): Promise<User[]> {
    return this.taskModel.find();
  }/*

  async getTask(taskID): Promise<Task> {
    return this.taskModel
      .findById(taskID)
      .exec();
  }

  async addTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const newTask = this.taskModel(createTaskDTO);
    return newTask.save();
  }

  async editTask(taskID, createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(taskID, createTaskDTO, { new: true });
  }

  async deleteTask(taskID): Promise<any> {
    return this.taskModel.findByIdAndRemove(taskID);
  }*/

}
