import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { ApiLoggerService } from 'src/api-logger/api-logger.service';
import { LoginInputDto } from './dto/login-input.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new ApiLoggerService(UsersController.name);

  
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }
  
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query("role") role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    this.logger.log(`Request for all users ${role}`);
    return this.usersService.findAll(role);
  }

  @Post('login')
  login(@Body() loginDto: LoginInputDto) : Promise<LoginDto> {
    this.logger.log(`Request for all users ${JSON.stringify(loginDto)} ${process.env.JWT_SECRET}`);
    return this.usersService.login(loginDto);
  }
  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
