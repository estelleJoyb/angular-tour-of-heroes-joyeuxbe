import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../data/hero';
import { ArmeId, Armes, ArmesConcrete } from '../data/armes';
//import { HeroService } from '../hero.service';
import { ArmesService } from '../armes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: [ './weapon-detail.component.css' ]
})
export class WeaponDetailComponent implements OnInit {
//   hero: Hero | undefined;
//   weapons: Armes[] | undefined;
//   weapon: Armes | undefined;

//   constructor(
//     private route: ActivatedRoute,
//     private heroService: HeroService,
//     private armeService: ArmesService,
//     private location: Location
//   ) {}

//   ngOnInit(): void {
//     this.getWeapon();
//     this.armeService.selectedArme = this.weapon;
//   }
//   getHero(): void {
//     this.heroService.getHeroes()
//     .subscribe(hero => {this.hero = hero});
//   }

//   getWeapon(): void {
//     //const id = Number(this.route.snapshot.paramMap.get('id'));
//     this.armeService.getWeapons()
//       .subscribe(weapon => this.weapon = weapon);
//   }

//   goBack(): void {
//     this.location.back();
//   }

//   getAllWeapons():void{
//     this.armeService.getWeapons()
//       .subscribe(weapons => this.weapons = weapons);
//   }

//   UpdateName(name : string){
//     if(this.weapon != undefined && name != ""){
//       this.armeService.SetName(name);
//     }
//   }

//   UpdateAttaque(attaque : number){
//     if(this.weapon != undefined && attaque >= 0){
//       this.armeService.SetAttaque(attaque);
//     }
//   }

//   UpdateEsquive(esquive : number){
//     if(this.weapon != undefined && esquive >= 0){
//       this.armeService.SetEsquive(esquive);
//     }
//   }

//   UpdateUsure(usure : number){
//     if(this.weapon != undefined && usure >= 0){
//       this.armeService.SetUsure(usure);
//     }
//   }



//   getImage(event: Event): void {
//     if(event.target ==null){
//       return;
//     }
//     const target= event.target as HTMLInputElement;
//     const files: File = (target.files as FileList)[0];
    
//     const reader = new FileReader();
//     reader.readAsDataURL(files);
//     reader.onload = () => { 
//       if(reader.result != null && this.weapon != undefined){
//         const arrayBuffer = reader.result; 
//         this.armeService.SetImage(arrayBuffer.toString());
//         console.log(arrayBuffer.toString());
//       }
      
//     }
// }
//weapons: ArmesConcrete[] | undefined;
  armeAsync?: Observable<ArmeId[]>;
  armeConcreteAsync?: Observable<ArmesConcrete[]>;
  arme: ArmeId[];
  armeConcrete: ArmesConcrete[];
  
  constructor(
    //private route: ActivatedRoute,
    //private heroService: HeroService,
    private armeService: ArmesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getArme();
    this.getArmeAsync();
    this.getArmesConcreteAsync();
    this.getArmeConcrete();
    //this.getAllWeapons();
  }

  getArme(): void {
    this.armeService.getWeapons()
    .subscribe(arme => {this.arme = arme});
  }
  getArmeConcrete():void {
    this.armeService.getWeaponsConcrete()
      .subscribe(armeConcrete => {
        this.armeConcrete = armeConcrete;
      });
  }
  getArmeAsync(): void {
    this.armeAsync = this.armeService.getWeapons();
  }

  getArmesConcreteAsync(): void {
    this.armeConcreteAsync = this.armeService.getWeaponsConcrete();
  }

  goBack(): void {
    this.location.back();
  }

  // getAllWeapons():void{
  //   this.armeService.getWeaponsConcrete()
  //     .subscribe(weapons => this.weapons = weapons);
  // }

  UpdateName(name : string){
    if(this.armeConcrete[0] != undefined && name != ""){
      this.armeConcrete[0].SetName(name);
    }
  }

  UpdateAttaque(attaque : number){
    if(this.armeConcrete != undefined && attaque >= 0){
      this.armeConcrete[0].SetAttaque(attaque);
    }
  }

  UpdateEsquive(esquive : number){
    if(this.armeConcrete != undefined && esquive >= 0){
      this.armeConcrete[0].SetEsquive(esquive);
    }
  }

  UpdateUsure(usure : number){
    if(this.armeConcrete != undefined && usure >= 0){
      this.armeConcrete[0].SetUsure(usure);
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
        if(reader.result != null && this.arme != undefined){
          const arrayBuffer = reader.result; 
          //const decoder = new TextDecoder('utf-8');
          //const stringImg = decoder.decode(arrayBuffer);
          this.armeConcrete[0].SetImage(arrayBuffer.toString());
          console.log(arrayBuffer.toString());
        }
        
      }
  }

  // addWeapon(id: string){
  //   var weapon;
  //   this.armeService.getWeapon(id)
  //     .subscribe(weapon => weapon = weapon);
  //   if(this.armeConcrete != undefined && weapon != undefined){
  //     this.armeConcrete[0].AddArme(weapon);
  //   }
  // }
  
}