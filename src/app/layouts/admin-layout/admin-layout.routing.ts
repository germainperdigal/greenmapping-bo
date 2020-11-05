import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UsersComponent } from '../../users/users.component';
import { IdeasComponent } from '../../ideas/ideas.component';
import { LoginComponent } from 'app/login/login.component';
import { AuthGuardService } from 'app/services/auth-guard.service';
import { BillingComponent } from 'app/billing/billing.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'users',   component: UsersComponent, canActivate: [AuthGuardService] },
    { path: 'pins',     component: IdeasComponent, canActivate: [AuthGuardService] },
    { path: 'billing',     component: BillingComponent, canActivate: [AuthGuardService] },
    { path: 'login',     component: LoginComponent },
];
