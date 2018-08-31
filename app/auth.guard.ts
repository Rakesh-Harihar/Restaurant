import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private rts:Router) {}
  canActivate(){
      if(localStorage.getItem('user')){
        return true;
      }else{
        this.rts.navigate(["login"]);
        return false;
      }
  }
}
