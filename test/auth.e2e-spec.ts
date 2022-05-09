import suoertest from 'supertest';
import 'dotenv/config';
import dbConfiguration from '../src/core/database/database.config';
import {localAppUrl} from "../src/core/constants/constants";
import {RegisterRequestDto} from "../src/modules/user/dto/register.dto";
import {Connection, createConnection} from "typeorm";
import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";
import {User} from "../src/modules/user/entities/user.entity";

describe('AppController (e2e)', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection({
      name: 'test',
      ...dbConfiguration()
    } as ConnectionOptions);
  });

  beforeEach(async () => {
    const userRepo = connection.getRepository(User);
    await userRepo.delete({});
  });

  it('Test authentication flow', async () => {
    const userData: RegisterRequestDto = {
      username: 'testuser',
      name: 'Test name',
      password: '123456'
    }

    await suoertest(localAppUrl)
      .post('/users')
        .send(userData)
      .expect(201);

    await suoertest(localAppUrl)
        .post('/users/login').send( {
      username: 'testuser',
      password: '123456'
    })
        .expect(201);
  });

  it('Test authentication flow with not registered user', async () => {
    await suoertest(localAppUrl)
        .post('/users/login').send( {
          username: 'test',
          password: '123456'
        })
        .expect(401);
  });

  it('Test Registration with the same user', async () => {
    const userData: RegisterRequestDto = {
      username: 'testuser',
      name: 'Test name',
      password: '123456'
    }

    await suoertest(localAppUrl)
        .post('/users')
        .send(userData)
        .expect(201);

    await suoertest(localAppUrl)
        .post('/users')
        .send(userData)
        .expect(400);
  });

  it('Test Registration with not required data', async () => {
    const userData: any = {
      username: 'testuser',
      password: '123456'
    }

    await suoertest(localAppUrl)
        .post('/users')
        .send(userData)
        .expect(400);
  });
});
