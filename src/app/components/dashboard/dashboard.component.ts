// Modulos de angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modulo de firebase
import { AngularFireAuth } from '@angular/fire/auth';

// Servicios
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private auth: AngularFireAuth,
    private _alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Cerrar sesion
  logout() {
    // Cerrar sesion
    this.auth.signOut();
    // Mostrar alerta de espera
    this._alert.showWaitAlert();
    setTimeout(() => {
      this.router.navigate(['/signIn']);
      this._alert.closeAlert();
    }, 500);
  }
}
