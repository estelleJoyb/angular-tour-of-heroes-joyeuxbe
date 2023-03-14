import { Component, OnInit } from '@angular/core';
import { Armes, ArmesConcrete } from '../data/armes';
import { ArmesService } from '../armes.service';

@Component({
  selector: 'app-dashboard-weapons',
  templateUrl: './dashboard-weapons.component.html',
  styleUrls: ['./dashboard-weapons.component.css']
})
export class DashboardWeaponsComponent implements OnInit {
  weapons: ArmesConcrete[] = [];

  constructor(private armesService: ArmesService){ }

  ngOnInit(): void {
      this.getWeapons();
  }

  getWeapons():void {
    this.armesService.getWeaponsConcrete()
      .subscribe(weapons => this.weapons = weapons.slice(1,5));
  }
}
