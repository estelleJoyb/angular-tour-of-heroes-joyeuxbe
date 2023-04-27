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
  textSeeWeapon: string;
  weapons: ArmesConcrete[] | undefined;
  HeroWeapons: ArmesConcrete[] | undefined;
  heroAsync?: Observable<HeroId[]>;
  heroConcreteAsync?: Observable<HeroConcrete[]>;
  hero: HeroId[];
  heroConcrete: HeroConcrete;
  progress:number;
  restearepartir: number;
  styleprogress: number;
  erreur: string;
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private armeService: ArmesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.textSeeWeapon = "See more Weapons";
    this.getHero();
    this.getHeroAsync();
    this.getHeroConcreteAsync();
    this.getHeroConcrete(id);
    this.getAllWeapons();
    this.getHeroConcreteWeapons();
  }

  getHero(): void {
    this.heroService.getHeroes()
    .subscribe(hero => {this.hero = hero});
  }
  getHeroConcrete(id: string):void {
    this.heroService.getHeroConcrete(id)
      .subscribe(heroConcrete => {
        this.heroConcrete = heroConcrete;
        this.progress = +this.heroConcrete.getAttaque() + +this.heroConcrete.getDegats() + +this.heroConcrete.getEsquive() + +this.heroConcrete.getPv();
        if(this.progress > 40){
          this.UpdateAttaque(10);
          this.UpdateDegats(10);
          this.UpdateEsquive(10);
          this.Updatepv(10);
        }
        console.log("progress getHeroConcrete : "+this.progress);
        this.RecalculProgress();
        console.log("progress getHeroConcrete : "+this.progress);
      });
  }
  getHeroConcreteWeapons():void{
    this.weapons.forEach(weapon => {
      this.armeService.getWeaponConcrete(weapon.toString())
      .subscribe(arme => { this.HeroWeapons.push(arme);});
    });
  }
  getHeroAsync(): void {
    this.heroAsync = this.heroService.getHeroes();
  }

  getHeroConcreteAsync(): void {
    this.heroConcreteAsync = this.heroService.getHeroesConcrete();
  }

  goBack(): void {
    this.location.back();//on quitte la page
  }

  getAllWeapons():void{
      this.armeService.getWeaponsConcrete()
      .subscribe(weapons => this.weapons = weapons.slice(0,4));
  }

  SeeAllWeapons(): void {
    if(this.weapons.length > 4){
      this.getAllWeapons();
      this.textSeeWeapon = "See more Weapons";
    }else{
      this.armeService.getWeaponsConcrete()
      .subscribe(weapons =>{
        this.weapons = weapons;
        this.textSeeWeapon = "See less Weapons";
      });
    }
  }
  RecalculProgress(){
    this.progress = +this.heroConcrete.getAttaque() + +this.heroConcrete.getDegats() + +this.heroConcrete.getEsquive() + +this.heroConcrete.getPv();
    
    this.styleprogress = (+this.progress * 100)/40;
    this.restearepartir = 40 - this.progress;
    console.log("REcalcul progress -- style progress : "+this.styleprogress+"\n progress : "+this.progress);
  }

  UpdateName(name : string){
    if(this.heroConcrete != undefined && name != ""){
      this.heroConcrete.setName(name);
      const dataName: Partial<HeroConcrete> = { name: this.heroConcrete.getName() };
      this.heroService.updateHero(this.heroConcrete.id, dataName);
      this.RecalculProgress();
    }else if(this.heroConcrete == undefined){
      this.erreur = "The hero is undefined";
    }else{
      this.erreur = "The total of point cannot be superior to 40";
    }
  }

  UpdateDegats(damage: number){
    var degatsmax = 40 - (+this.heroConcrete.getAttaque() + +this.heroConcrete.getEsquive() + +this.heroConcrete.getPv());
    if(this.heroConcrete != undefined && damage >= 1 && damage <= degatsmax){
      console.log("updating degats");
      this.heroConcrete.setDegats(damage);
      const dataDegats: Partial<HeroConcrete> = { degats: this.heroConcrete.getDegats()};
      this.heroService.updateHero(this.heroConcrete.id, dataDegats);
      this.RecalculProgress();
    }else if(damage < 1){
      this.erreur = "Damage cannot be inferior to 1";
    }else{
      this.erreur = "The total of point cannot be superior to 40";
    }
  }

  UpdateAttaque(attaque : number){
    var attaquemax = 40 - (this.progress - this.heroConcrete.getAttaque());
    if(this.heroConcrete != undefined && attaque >= 1 && attaque <= attaquemax){
      this.heroConcrete.setAttaque(attaque);
      const dataAttaque: Partial<HeroConcrete> = { attaque: this.heroConcrete.getAttaque()};
      this.heroService.updateHero(this.heroConcrete.id, dataAttaque);
      this.RecalculProgress();
    }else if(attaque < 1){
      this.erreur = "Attack cannot be inferior to 1";
    }else{
      this.erreur = "The total of point cannot be superior to 40";
    }
  }

  UpdateEsquive(esquive : number){
    var esquivemax = 40 - (this.progress - this.heroConcrete.getEsquive());
    if(this.heroConcrete != undefined && esquive >= 1 && esquive <= esquivemax){
      this.heroConcrete.setEsquive(esquive);
      const dataEsquive: Partial<HeroConcrete> = { esquive: this.heroConcrete.getEsquive()};
      this.heroService.updateHero(this.heroConcrete.id, dataEsquive);
      this.RecalculProgress();
    }else if(esquive < 1){
      this.erreur = "Dodge cannot be inferior to 1";
    }else{
      this.erreur = "The total of point cannot be superior to 40";
    }
  }

  Updatepv(pv : number){
    var pvmax = 40 - (this.progress - this.heroConcrete.getPv());

    if(this.heroConcrete != undefined && pv >= 1 && pv <= pvmax){
      this.heroConcrete.setPv(pv);
      const dataPv: Partial<HeroConcrete> = { pv: this.heroConcrete.getPv()};
      this.heroService.updateHero(this.heroConcrete.id, dataPv);
      this.RecalculProgress();
    }else if(pv < 1){
      this.erreur = "Hit Point cannot be inferior to 1";
    }else {
      this.erreur = "The total of point cannot be superior to 40";
    }
  }

  getImage(event: Event): void {
      if(event.target ==null){
        return;
      }
      const target= event.target as HTMLInputElement;
      const files: File = (target.files as FileList)[0];
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => { 
        if(reader.result != null && this.hero != undefined){
          const arrayBuffer = reader.result; 
          this.heroConcrete.setImage(arrayBuffer.toString());
          const dataImage: Partial<HeroConcrete> = { image: this.heroConcrete.getImage()};
          this.heroService.updateHero(this.heroConcrete.id, dataImage);
        }
        
      }
  }

  addWeapon(weapon : ArmesConcrete){
    console.log("ADD WEAPON !");
    this.heroConcrete.AddArme(weapon);
    const data: Partial<HeroConcrete> = { armes: this.heroConcrete.armes};
    this.heroService.updateHero(this.heroConcrete.id, data);
    this.getHeroConcreteWeapons();
  }

  RemoveWeapon(id: number){

  }

  
}