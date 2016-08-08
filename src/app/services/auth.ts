/**
 * Created by consultadd on 5/8/16.
 */
import {Injectable} from '@angular/core'
import {StoreHelper} from './stores-helper';
import {CanActivate,Router} from '@angular/router'
import {ApiService} from "./api";
import {Store} from '../store'

@Injectable()
export class AuthService implements CanActivate{
    constructor(private router : Router,
                private apiService :ApiService,
                private storehelper :StoreHelper,
                private store:Store){

        this.setJwt(window.localStorage.getItem(this.JWT_KEY))
    }
JWT_KEY :string ='retain_token';

setJwt(jwt:string){
    window.localStorage.setItem(this.JWT_KEY,jwt);
    this.apiService.setHeaders({Authorization:`Bearer ${jwt}`});
}
authenticate(path,creds){
    return this.apiService.post(`/${path}`,creds)
        .do(res=>this.setJwt(res.token))
        .do(res=>this.storehelper.update('user' ,res.data))
        .map(res=>res.data);
}
signout(){
    window.localStorage.removeItem(this.JWT_KEY);
    this.store.purge();
    this.router.navigate(['','auth']);
}

    isAuthorized():boolean{
        return Boolean(window.localStorage.getItem(this.JWT_KEY));


    }
    canActivate():boolean{
        const isAuth =this.isAuthorized();
        if (!isAuth){
            this.router.navigate(["","auth"]);
        }
        return isAuth;
    }
}