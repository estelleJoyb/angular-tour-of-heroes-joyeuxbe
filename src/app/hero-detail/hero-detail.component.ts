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
  heroConcrete: HeroConcrete;
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private armeService: ArmesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getHero();
    this.getHeroAsync();
    this.getHeroConcreteAsync();
    this.getHeroConcrete(id);
    this.getAllWeapons();

  }

  getHero(): void {
    this.heroService.getHeroes()
    .subscribe(hero => {this.hero = hero});
  }
  getHeroConcrete(id: string):void {
    this.heroService.getHeroConcrete(id)
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
    this.location.back();//on quitte la page
  }

  getAllWeapons():void{
    this.armeService.getWeaponsConcrete()
      .subscribe(weapons => this.weapons = weapons);
  }

  UpdateName(name : string){
    if(this.heroConcrete != undefined && name != ""){
      this.heroConcrete.setName(name);
      const dataName: Partial<HeroConcrete> = { name: this.heroConcrete.getName() };
      this.heroService.updateHero(this.heroConcrete.id, dataName);
    }
  }

  UpdateDegats(damage: number){
    if(this.heroConcrete != undefined && damage >= 0){
      this.heroConcrete.setDegats(damage);
      const dataDegats: Partial<HeroConcrete> = { degats: this.heroConcrete.getDegats()};
      this.heroService.updateHero(this.heroConcrete.id, dataDegats);
    }
  }

  UpdateAttaque(attaque : number){
    if(this.heroConcrete != undefined && attaque >= 0){
      this.heroConcrete.setAttaque(attaque);
      const dataAttaque: Partial<HeroConcrete> = { attaque: this.heroConcrete.getAttaque()};
      this.heroService.updateHero(this.heroConcrete.id, dataAttaque);
    }
  }

  UpdateEsquive(esquive : number){
    if(this.heroConcrete != undefined && esquive >= 0){
      this.heroConcrete.setEsquive(esquive);
      const dataEsquive: Partial<HeroConcrete> = { esquive: this.heroConcrete.getEsquive()};
      this.heroService.updateHero(this.heroConcrete.id, dataEsquive);
    }
  }

  Updatepv(pv : number){
    if(this.heroConcrete != undefined && pv >= 0){
      this.heroConcrete.setPv(pv);
      const dataPv: Partial<HeroConcrete> = { pv: this.heroConcrete.getPv()};
      this.heroService.updateHero(this.heroConcrete.id, dataPv);
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
          this.heroConcrete.setImage(arrayBuffer.toString());
          const dataImage: Partial<HeroConcrete> = { image: this.heroConcrete.getImage()};
          this.heroService.updateHero(this.heroConcrete.id, dataImage);
        }
        
      }
  }

  addWeapon(id: string){
    var weapon;
    this.armeService.getWeapon(id)
      .subscribe(weapon => weapon = weapon);
    if(this.heroConcrete != undefined && weapon != undefined){
      this.heroConcrete.AddArme(weapon);
    }
  }

  
}