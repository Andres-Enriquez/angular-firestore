// Modulos de angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private _auth: AuthService) {}

  ngOnInit(): void {
    // Inicializar formulario
    this.initForm();
  }

  // Inicializacion de formulario
  initForm() {
    this.loginForm = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  /*---------------------------Validaciones del Formulario --------------------- */

  // Resaltar en el campo usuario si no es valido
  get userNotValid() {
    return (
      this.loginForm.get('correo').invalid &&
      this.loginForm.get('correo').touched
    );
  }

  // Resaltar en el campo password si no es valido
  get passNotValid() {
    return (
      this.loginForm.get('password').invalid &&
      this.loginForm.get('password').touched
    );
  }

  /*------------------------------------------------------------------------- */

  /*--------------------------- Logica del componente --------------------- */

  /**
   * Metodo para iniciar sesion
   */
  login() {
    // Obtener los datos del formulario
    const email = String(this.loginForm.get('correo').value).trim();
    const pass = String(this.loginForm.get('password').value).trim();
    // Enviar los datos al servicio para iniciar sesion
    this._auth.signIn(email, pass);
  }
}
