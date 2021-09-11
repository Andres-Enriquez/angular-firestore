import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserSesionGuard implements CanActivate {
  constructor(private db: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const result = await this.db.getSession();
    // Verificar si tiene sesion
    if (result) {
      if (state.url === '/signIn' || state.url === '/signUp') {
        this.router.navigate(['/dashboard']);
        return false;
      } else if (state.url === '/dashboard') {
        return true;
      }
      // Esta condicion se cumple cuando no tiene sesion
    } else {
      if (state.url === '/dashboard') {
        this.router.navigate(['/signIn']);
        return false;
      } else {
        return true;
      }
    }
  }
}
