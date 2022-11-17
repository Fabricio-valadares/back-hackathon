import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<any> {
    try {
      const {
        data: { access_token },
      } = await lastValueFrom(
        this.http.post(
          'http://localhost:8080/auth/realms/my-realm/protocol/openid-connect/token', // trocar my-realm pelo nome da realm q vc criou
          new URLSearchParams({
            client_id: 'admin-cli',
            client_secret: '6542bde3-02fc-4fda-ae7b-2f3e3da4bf22', // client secret do realm q vc vai criar
            grant_type: 'client_credentials',
          }),
        ),
      );

      const res1 = await lastValueFrom(
        this.http.post(
          'http://localhost:8080/auth/admin/realms/my-realm/users', // trocar my-realm pelo nome da realm q vc criou
          {
            enabled: true,
            username: username,
            email: email,
            firstName: 'Fafabs',
            lastName: 'Silva Sauro',
            credentials: [
              {
                type: 'password',
                value: password,
                temporary: false,
              },
            ],
            requiredActions: [],
            groups: [],
            attributes: {
              locale: ['en'],
            },
          },
          { headers: { Authorization: `Bearer ${access_token}` } },
        ),
      );

      console.log(res1);

      return { userCreated: true };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        { reason: 'failed to login' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(username: string, password: string): Promise<any> {
    try {
      const { data } = await lastValueFrom(
        this.http.post(
          'http://host.docker.internal:8080/auth/realms/my-realm/protocol/openid-connect/token', // trocar my-realm pelo nome da realm q vc criou
          new URLSearchParams({
            client_id: 'admin-cli',
            client_secret: '6542bde3-02fc-4fda-ae7b-2f3e3da4bf22', // client secret do realm q vc vai criar
            grant_type: 'password',
            username,
            password,
          }),
        ),
      );

      return data;
    } catch (error) {
      throw new HttpException(
        { reason: 'failed to login' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
