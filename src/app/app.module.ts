import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing.module';
import { WeaponsComponent } from './weapons/weapons.component';
import { DashboardWeaponsComponent } from './dashboard-weapons/dashboard-weapons.component';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CreateHeroComponent } from './create-hero/create-hero.component';
import { CreateWeaponComponent } from './create-weapon/create-weapon.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    WeaponsComponent,
    DashboardWeaponsComponent,
    WeaponDetailComponent,
    CreateHeroComponent,
    CreateWeaponComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
})
export class AppModule { }