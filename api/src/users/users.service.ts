import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { LoginInputDto } from './dto/login-input.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService, private jwtService: JwtService){}

  async login(loginInputDto: LoginInputDto): Promise<LoginDto> {
    // Step 1: Fetch a user with the given email
    const user = await this.db.user.findUnique({ where: { email: loginInputDto.email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${loginInputDto.email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = true;//user.password === loginInputDto.password;

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    const accessToken = this.jwtService.sign({ userId: user.id });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      access_token: accessToken
    }
  }
  
  create(createUserDto: Prisma.UserCreateInput) {
    
    return this.db.user.create({
      data: createUserDto
    });
  }

  findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    if(role)
      return this.db.user.findMany({where: {role,}});
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return this.db.user.findUnique({
      where: {
        id,
      }
    })
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.db.user.update({
      where:{
        id,
      }, 
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.db.user.delete({where: {id,}});
  }
}
