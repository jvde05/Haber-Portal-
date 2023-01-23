import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { from, of,switchMap } from 'rxjs';
import { UserForLogin } from '../models/firebaseModels/userForLogin';
import { UserForRegister } from '../models/firebaseModels/userForRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly user$  = authState(this.auth);
  
  constructor(private auth:Auth) { }

  login(userForLoginModel:UserForLogin){
    return from(signInWithEmailAndPassword(this.auth,userForLoginModel.email,userForLoginModel.password))
  }

  register(userForRegisterModel:UserForRegister){
    const displayNameModel = userForRegisterModel.firstName + " " + userForRegisterModel.lastName;
    return from(createUserWithEmailAndPassword(this.auth,userForRegisterModel.email,userForRegisterModel.password)).pipe(
      switchMap(({user}) => updateProfile(user,{displayName:displayNameModel}))
    )
  }
  
  logout(){
    return from(this.auth.signOut())
  }

}
