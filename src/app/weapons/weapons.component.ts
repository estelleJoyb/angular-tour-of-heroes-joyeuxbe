import { Component, OnInit } from '@angular/core';

import { ArmeId, Armes, ArmesConcrete } from '../data/armes';
import { ArmesService } from '../armes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {
  weaponsAsync?: Observable<ArmeId[]>;
  armesConcreteAsync?: Observable<ArmesConcrete[]>;
  armesConcrete: ArmesConcrete[];
  armes: ArmeId[];

  constructor(private armesService: ArmesService) { }

  ngOnInit(): void {
    this.getWeapons();
    this.getWeaponsConcrete();
  }

  getWeapons(): void {
    this.armesService.getWeapons()
    .subscribe(armes => {this.armes = armes});
  }
  getWeaponsAsync(): void {
    this.weaponsAsync = this.armesService.getWeapons();
  }

  getWeaponsConcreteAsync(): void {
    this.armesConcreteAsync = this.armesService.getWeaponsConcrete();
  }

  getWeaponsConcrete(): void {
    this.armesService.getWeaponsConcrete()
    .subscribe(armesConcrete => {this.armesConcrete = armesConcrete});
  }

  deleteWeapon(arme: string): void {
    this.armesService.deleteArme(arme);
  }
}