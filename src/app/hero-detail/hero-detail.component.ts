import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero, HeroConcrete, HeroId } from '../data/hero';
import { Armes, ArmesConcrete, ArmeId } from '../data/armes';
import { HeroService } from '../hero.service';
import { ArmesService } from '../armes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  //hero: HeroConcrete | undefined;
  weapons: ArmesConcrete[] | undefined;
  heroAsync?: Observable<HeroId[]>;
  heroConcreteAsync?: Observable<HeroConcrete[]>;
  hero: HeroId[];
  heroConcrete: HeroConcrete[];
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private armeService: ArmesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getHeroAsync();
    this.getHeroConcreteAsync();
    this.getHeroConcrete();
    this.getAllWeapons();
  }

  getHero(): void {
    this.heroService.getHeroes()
    .subscribe(hero => {this.hero = hero});
  }
  getHeroConcrete():void {
    this.heroService.getHeroesConcrete()
      .subscribe(heroConcrete => {
        this.heroConcrete = heroConcrete;
      });
  }
  getHeroAsync(): void {
    this.heroAsync = this.heroService.getHeroes();
  }

  getHeroConcreteAsync(): void {
    this.heroConcreteAsync = this.heroService.getHeroesConcrete();
  }

  goBack(): void {
    this.location.back();
  }

  getAllWeapons():void{
    this.armeService.getWeaponsConcrete()
      .subscribe(weapons => this.weapons = weapons);
  }

  UpdateName(name : string){
    if(this.heroConcrete[0] != undefined && name != ""){
      this.heroConcrete[0].setName(name);
    }
  }

  UpdateAttaque(attaque : number){
    if(this.heroConcrete != undefined && attaque >= 0){
      this.heroConcrete[0].setAttaque(attaque);
    }
  }

  UpdateEsquive(esquive : number){
    if(this.heroConcrete != undefined && esquive >= 0){
      this.heroConcrete[0].setEsquive(esquive);
    }
  }

  Updatepv(pv : number){
    if(this.heroConcrete != undefined && pv >= 0){
      this.heroConcrete[0].setPv(pv);
    }
  }

  getImage(event: Event): void {
      if(event.target ==null){
        return;
      }
      const target= event.target as HTMLInputElement;
      const files: File = (target.files as FileList)[0];
      //const files = (event.target as HTMLInputElement).files[0]; //event.target.files;
      
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => { 
        if(reader.result != null && this.hero != undefined){
          const arrayBuffer = reader.result; 
          //const decoder = new TextDecoder('utf-8');
          //const stringImg = decoder.decode(arrayBuffer);
          this.heroConcrete[0].setImage(arrayBuffer.toString());
          console.log(arrayBuffer.toString());
        }
        
      }
  }

  addWeapon(id: string){
    var weapon;
    this.armeService.getWeapon(id)
      .subscribe(weapon => weapon = weapon);
    if(this.heroConcrete != undefined && weapon != undefined){
      this.heroConcrete[0].AddArme(weapon);
    }
  }
  
}