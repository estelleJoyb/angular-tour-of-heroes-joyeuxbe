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

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'weapons', component: WeaponsComponent},
  { path: 'dashboardweapons', component: DashboardWeaponsComponent},
  { path: 'detailweapon/:id', component: WeaponDetailComponent},
  { path: 'createhero', component: CreateHeroComponent},
  { path: 'createweapon', component: CreateWeaponComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}