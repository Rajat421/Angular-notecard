/**
 * Created by consultadd on 5/8/16.
 */
import {Injectable} from  '@angular/core'
import 'rxjs/Rx';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export interface Note{
    title:string;
    value:string;
    color:string;
    id?:string|number;
    createdAt:string;
    updatedAt:string;
    userId:string;
}
export interface State{
    notes: Note[];
    user: Object;
}
const defaultState :State ={
    notes:[],
    user :{}
};


const _store = new BehaviorSubject<State>(defaultState);
@Injectable()
export class Store{
    private _store = _store;
    changes = this._store.asObservable().distinctUntilChanged()
        .do(()=>console.log('changes'));
    setState(state:State){
        console.log('state set',state);
        this._store.next(state);

    }
    getState():State{
        return this._store.value;

}
purge(){
    this._store.next(defaultState);
}
}


