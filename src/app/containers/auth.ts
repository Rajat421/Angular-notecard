/**
 * Created by consultadd on 5/8/16.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth'
@Component({
    selector: 'auth-container',
    styles: [`.auth {
      height: 100%;
    }
    input {
      border-bottom: 1px solid lightgrey;
    }
    .ng-invalid.ng-dirty {
      border-bottom: 1px solid red;
    }
    form {
      width: 100%;
      border-radius: 2px;
      background-color: white;
      padding: 20px;
      height: 400px;
    }
    .inputs {
      height: 100%;
      position: relative;
    }
    .link {
      color: lightblue;
    }
    .link:hover {
      background-color: transparent;
    }
    .title {
      font-size: 36px;
      font-weight: 300;
      text-transform: capitalize;
    }
    .error {
      color: red;
      position: absolute;
      right: 20px;} `],
    template: `   <div class="auth row center-xs middle-xs">
      <form class="col-xs-6 shadow-2" (submit)="authenticate()" #authForm ='ngForm' >
        <div class="inputs row center-xs middle-xs">
          <h3 class="col-xs-8 title">
          {{mode}}
          </h3>
          <input
            class="col-xs-8"
            type="email"
            name="email"
            required
            #email="ngModel"
            [(ngModel)]="user.email"
           
            placeholder="email"
          >
          <div class="error" [hidden]="email.valid||email.pristine" >email is invalid</div>
          <input
            class="col-xs-8"
            type="password"
            name="password"
            required
            [(ngModel)]="user.password"
            #pass ='ngModel'
            placeholder="password"
          >
          <div class="error" [hidden]="pass.valid||pass.pristine">password is required</div>
          <div class="actions col-xs-12">
            <div class="row center-xs">
              <button type="submit" class="btn-light" [disabled]="!authForm.form.valid">
              {{mode}}
</button>
              <a (click)="changeMode()" class="btn-light link">
              {{linkText}}
</a>
           </div>
         </div>
        </div>
      </form>
    </div>
  `
})

export class Auth {
    user ={
        email:'' ,
        password :''
    };
    mode :string ='signin';
    linkText :string ='Dont have and account?;'
    constructor (private router:Router,private authService :AuthService){

    }
    changeMode(){
        if (this.mode ==='signin'){
            this.mode ='signup'
            this.linkText='Already have an account?'
        }else{
            this.mode ='signin';
            this.linkText ='Don\'t have an account?';
        }
    }
    authenticate(){
        this.authService.authenticate(this.mode,this.user)
            .subscribe(() =>this.router.navigate(['']))
    }
}
