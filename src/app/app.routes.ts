import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/pages/register/register.component';

export const routes: Routes = [
    {path: '', component: RegisterComponent, pathMatch: 'full'}, 
];
