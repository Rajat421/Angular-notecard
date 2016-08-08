import {RouterConfig} from '@angular/router'
import {Notes,Main,Auth} from './containers'
import {About} from "./containers/about";
import {AuthService} from  './services'

export const routes :RouterConfig =[
    {
        path:'' ,
        component:Main,
        canActivate: [AuthService],
        children:[{
            path:'',
            component:Notes
        },
            {
            path:'about',
            component:About
        }
        ]
    },{path:'auth' ,component : Auth },
    {
        path:'**',
        redirectTo:''
    }
]