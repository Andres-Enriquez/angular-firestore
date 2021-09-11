// Modulo de angular
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// Modulo de firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

// Modelo de datos
import { User } from '../models/user';

// Servicio
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _auth: AngularFireAuth,
    private _alert: AlertService,
    private db: AngularFirestore,
    private router: Router
  ) {}


  // Verificar la sesion del usuario
  getSession() {
    return new Promise((resolve, reject) => {
      this._auth.authState.subscribe((user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  /**
   * Metodo para iniciar seion
   */
  signIn(email: string, password: string) {
    this._alert.showWaitAlert();
    this._auth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        // Navegar al component dashboard
        this.router.navigate(['/dashboard']);
        // Ocultar alerta
        this._alert.closeAlert();
      })
      .catch((error) => {
        let message: string;
        // Indica que el correo electronico es invalido
        if (error.code == 'auth/invalid-email') {
          message = 'El correo electronico no es valido';
          this._alert.showMessageError('Correo invalido', message);
          // Indicar que el correo electronico se encuentra deshabilitado
        } else if (error.code == 'auth/user-disabled') {
          message = 'La cuenta se encuentra deshabilitado';
          this._alert.showMessageError('Cuenta no disponible', message);
          // Indica que la cuenta no existe
        } else if (error.code == 'auth/user-not-found') {
          message = 'Esta cuenta no existe por favor verifica los datos';
          this._alert.showMessageError('La Cuenta no existe', message);
          // Indica que existe la cuenta pero ha digitado mal la contraseña
        } else if (error.code == 'auth/wrong-password') {
          message = 'Esta cuenta no existe por favor verifica los datos';
          this._alert.showMessageError('La Cuenta no existe', message);
          // Indica que se encontro un error en el servidor de firebase
        } else {
          console.error(error);
          message = 'Por favor intentalo de nuevo';
          this._alert.showMessageError(
            'Ocurrio un error en el servidor',
            message
          );
        }
      });
  }

  /**
   * Metodo para registrar usuario
   */
  signUp(value: NgForm) {
    this._alert.showWaitAlert();
    // Obtener el email y password para crear el usuario
    const email = value['correo'];
    const pass = value['pass1'];

    // Crear usuario
    this._auth
      .createUserWithEmailAndPassword(email, pass)
      .then(async (resp) => {
        // Establecer datos del usuario
        const user = new User();
        user.firstName = String(value['firstName']).trim();
        user.lastName = String(value['lastName']).trim();
        user.email = resp.user.email;

        // Guardar los datos del usuario
        await this.saveData(user, email, pass);
        // Navegar al component dashboard
        this.router.navigate(['/dashboard']);
        // Mostrar alerta exitosa
        this._alert.showMessageSuccess(
          'Bienvenido',
          'Se registro exitosamente'
        );
      })
      .catch((error) => {
        let message: string;
        // Indicar que la cuenta ya esta creada
        if (error.code == 'auth/email-already-in-use') {
          message = 'El correo electronico ya se encuentra en uso';
          this._alert.showMessageError('No se permite duplicados', message);
          // Indica que el correo es invalido
        } else if (error.code == 'auth/invalid-email') {
          message = 'El correo electronico es invalido';
          this._alert.showMessageError('Correo invalido', message);
          // Indicar que la cuenta no esta habilitada
        } else if (error.code == 'operation-not-allowed') {
          message = 'Esta cuenta no esta habilitada';
          this._alert.showMessageError('Cuena bloqueada', message);
          // Indica que la contraseña es debil
        } else if (error.code == 'auth/weak-password') {
          message = 'La contraseña es debil';
          this._alert.showMessageError('Cuena bloqueada', message);
        } else {
          // Indica que se encontro un error en el servidor de firebase
          message = 'Por favor intentalo de nuevo';
          this._alert.showMessageError(
            'Ocurrio un error en el servidor',
            message
          );
        }
      });
  }

  /**
   * Metodo para guardar los datos del usuario
   * en firebase
   * @param user
   */
  async saveData(user: User, email: string, password: string) {
    // Iniciar sesion con el usuario creado
    this._auth
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        // Guardar en la coleccion usuario
        this.db.collection('usuario').doc().set(Object.assign({}, user));
      });
  }
}
