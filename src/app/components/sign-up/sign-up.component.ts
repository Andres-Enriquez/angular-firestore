// Modulos de angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Modelo de datos
import { User } from 'src/app/models/user';

// Servicios
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private _alert: AlertService, private _auth: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Inicializar formulario
  initForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      pass1: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      pass2: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  /*---------------------------Validaciones del Formulario --------------------- */

  // Resaltar en el campo nombre si no es valido
  get firstNameInvalid() {
    return (
      this.registerForm.get('firstName').invalid &&
      this.registerForm.get('firstName').touched
    );
  }

  // Resaltar en el campo apellido si no es valido
  get lastNameInvalid() {
    return (
      this.registerForm.get('lastName').invalid &&
      this.registerForm.get('lastName').touched
    );
  }

  // Resaltar en el campo correo si no es valido
  get emailInvalid() {
    return (
      this.registerForm.get('correo').invalid &&
      this.registerForm.get('correo').touched
    );
  }

  // Resaltar en el campo contraseña si no es valido
  get pass1Invalid() {
    return (
      this.registerForm.get('pass1').invalid &&
      this.registerForm.get('pass1').touched
    );
  }

  // Resaltar en el campo confirmar contraseña si no es valido
  get pass2Invalid() {
    return (
      this.registerForm.get('pass2').invalid &&
      this.registerForm.get('pass2').touched
    );
  }

  /*------------------------------------------------------------------------- */

  /*--------------------------- Logica del componente --------------------- */

  // Registrar usuario
  signUp() {
    // Obtener los datos
    // const firstName = String(this.registerForm.get('firstName').value).trim();
    // const lastName = String(this.registerForm.get('lastName').value).trim();
    // const email = String(this.registerForm.get('correo').value).trim();
    const pass1 = String(this.registerForm.get('pass1').value).trim();
    const pass2 = String(this.registerForm.get('pass2').value).trim();

    // Verificar si coinciden las contraseñas
    if (pass1 == pass2) {
        this._auth.signUp(this.registerForm.value);
    } else {
      this._alert.showMessageError(
        'Contraseña no coincide',
        'Por favor verifique que las contraseñas coinicidan'
      );
    }
  }

  /*------------------------------------------------------------------------- */
}
