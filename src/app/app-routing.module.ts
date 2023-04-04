import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardWeaponsComponent } from './dashboard-weapons/dashboard-weapons.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { WeaponsComponent} from './weapons/weapons.component';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';
import { CreateHeroComponent } from './create-hero/create-hero.component';
import { CreateWeaponComponent } from './create-weapon/create-weapon.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
//route guard
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent, canActivate: [AuthGuard]},
  { path: 'heroes', component: HeroesComponent },
  { path: 'weapons', component: WeaponsComponent},
  { path: 'dashboardweapons', component: DashboardWeaponsComponent},
  { path: 'detailweapon/:id', component: WeaponDetailComponent, canActivate: [AuthGuard]},
  { path: 'createhero', component: CreateHeroComponent, canActivate: [AuthGuard]},
  { path: 'createweapon', component: CreateWeaponComponent, canActivate: [AuthGuard]},
  { path: 'sign-in', component:SignInComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'verify-email-adress', component: VerifyEmailComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}