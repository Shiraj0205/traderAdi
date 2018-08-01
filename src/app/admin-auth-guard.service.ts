import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../node_modules/@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from "rxjs/operators";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth : AuthService, private userService : UserService) { }

  canActivate(){
    return this.auth.appUser$.pipe(map(x => x.isAdmin));
    };
  }