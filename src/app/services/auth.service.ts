import { Injectable } from '@angular/core';
import { IUser } from '../models/iuser';

export enum Roles {
  USER = 'user',
  ORGANIZATION = 'organization',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  role: Roles;
  isLoggedIn = false;
  loggedInUser: IUser;

  constructor() {}

  login(email: string, password: string, loginRole: string): boolean {
    if (loginRole == Roles.USER) {
      this.loggedInUser = this.userLogin(email, password);
    } else {
      this.loggedInUser = this.organizationLogin(email, password);
    }

    return this.isLoggedIn;
  }

  userLogin(email: string, password: string) {
    let users = this.users.filter((user) => {
      return user.email === email && user.password === password;
    });

    if (users.length !== 0) {
      this.isLoggedIn = true;
      this.role = Roles.USER;
    }

    return users[0];
  }

  organizationLogin(email: string, password: string) {
    let org = this.organizations.filter((org) => {
      return org.email === email && org.password === password;
    });

    if (org.length !== 0) {
      this.isLoggedIn = true;
      this.role = Roles.ORGANIZATION;
    }
    return org[0];
  }

  logout() {
    this.role = null;
    this.isLoggedIn = false;
    this.loggedInUser = null;
  }
}
