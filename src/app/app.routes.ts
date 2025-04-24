import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/front/layout.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { RoleGuard } from './Auth/role.guard';
import { BacklayoutComponent } from './layout/back/backlayout.component';
import { PropertyComponentB } from './BackWork/property/property.component';
import { PropertyComponentF } from './FrontWork/property/property.component';
import { BlogComponent } from './BackWork/blog/blog.component';
import { IncidentsComponent } from './BackWork/incidents/incidents.component';
import { ServicesComponent } from './BackWork/services/services.component';
import { TransactionsComponent } from './BackWork/transactions/transactions.component';
import { UsersComponent } from './BackWork/users/users.component';
import { AdminGuard } from './Auth/admin.guard';
import { IncidentsComponentF } from './FrontWork/incidents/incidents.component';
// import your feature components here

export const routes: Routes = [
  //front
  {
    path: '',
    component: LayoutComponent,
    canActivate: [RoleGuard],
    children: [
      { path: 'property', component: PropertyComponentF },
      { path: 'incidents/:propertyId', component: IncidentsComponentF }
    ]
  },
  //back
  {
    path: 'back',
    component: BacklayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'property', component: PropertyComponentB },
      { path: 'incidents', component: IncidentsComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'services', component: ServicesComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup',component: SignupComponent },


];
