import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
// import { environment } from '../environments/environment';
// import { LoginComponent } from '../login/login.component';
// import { SignupComponent } from '../signup/signup.component';
import { environment } from './environments/environment';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ], withComponentInputBinding()), // Only withComponentInputBinding
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
};