import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}
  @Post('/me')
  async checkUser(@Res() res, @Body() body) {
    const user = await this.userService.checkUser(body);
    if (!user) { throw new NotFoundException('User does not exist!'); }
    return res.status(HttpStatus.OK).json(user);
  }

  @Post('/create')
  async createUser(@Res() res, @Body() body) {
    const user = await this.userService.createUser(body);
    return res.status(HttpStatus.OK).json(user);
  }

  /*
  @Put('/users/:userID')
  async editUser(
    @Res() res,
    @Param('userID', new ValidateObjectId()) userID,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const editedUser = await this.userService.editUser(userID, createUserDTO);
    if (!editedUser) { throw new NotFoundException('User does not exist!'); }
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user: editedUser,
    });
  }

  @Delete('/users/:userID')
  async deleteUser(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
    const deletedUser = await this.userService.deleteUser(userID);
    if (!deletedUser) { throw new NotFoundException('User does not exist!'); }
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted!',
      user: deletedUser,
    });*/
}
