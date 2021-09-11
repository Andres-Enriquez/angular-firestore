# Angular - Firestore

Este es un proyecto que permite a un usuario registrarse, iniciar sesion, cerrar sesion con firestore y por ultimo el sistema verifica la sesion del usuario

## Pila tecnologia
- Angular 10
- Bootstrap 5
- Firestore

## Configuracion credenciales
Debe anexar en el archivo environments.ts y environment.prod.ts las credenciales de firebase de su proyecto para probar el codigo
export const config = {
  apiKey: 'YOUR_API_KEY_HERE',
  authDomain: 'YOUR_AUTH_DOMAIN_HERE',
  databaseURL: 'YOUR_DATABASE_URL_HERE',
  projectId: 'YOUR_PROJECT_ID_HERE',
  storageBucket: 'YOUR_STORAGE_BUCKET_HERE',
  messagingSenderId: 'YOUR_MESSENGER_SENDER_ID_HERE'
};
