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
  armeAsync?: Observable<ArmeId[]>;
  armeConcreteAsync?: Observable<ArmesConcrete[]>;
  arme: ArmeId[];
  armeConcrete: ArmesConcrete;
  
  constructor(
    private route: ActivatedRoute,
    private armeService: ArmesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getArme();
    this.getArmeAsync();
    this.getArmesConcreteAsync();
    this.getArmeConcrete(id);
  }

  getArme(): void {
    this.armeService.getWeapons()
    .subscribe(arme => {this.arme = arme});
  }
  getArmeConcrete(id : string):void {
    this.armeService.getWeaponConcrete(id)
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
    //quitter la page
    this.location.back();
  }

  UpdateName(name : string){
    if(this.armeConcrete != undefined && name != ""){
      this.armeConcrete.SetName(name);
      const dataName: Partial<ArmesConcrete> = { name: this.armeConcrete.GetName() };
      this.armeService.updateArme(this.armeConcrete.id, dataName); 
    }
  }

  UpdateAttaque(attaque : number){
    if(this.armeConcrete != undefined && attaque >= 0){
      this.armeConcrete.SetAttaque(attaque);
      const dataAttaque: Partial<ArmesConcrete> = { attaque: this.armeConcrete.GetAttaque()};
      this.armeService.updateArme(this.armeConcrete.id, dataAttaque);
    }
  }

  UpdateEsquive(esquive : number){
    if(this.armeConcrete != undefined && esquive >= 0){
      this.armeConcrete.SetEsquive(esquive);
      const dataEsquive: Partial<ArmesConcrete> = { esquive: this.armeConcrete.GetEsquive()};
      this.armeService.updateArme(this.armeConcrete.id, dataEsquive);
    }
  }

  UpdateUsure(usure : number){
    if(this.armeConcrete != undefined && usure >= 0){
      this.armeConcrete.SetUsure(usure);
      const dataUsure: Partial<ArmesConcrete> = { usure: this.armeConcrete.GetUsure()};
      this.armeService.updateArme(this.armeConcrete.id, dataUsure);
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
          this.armeConcrete.SetImage(arrayBuffer.toString());
          const dataImage: Partial<ArmesConcrete> = { image: this.armeConcrete.GetImage()};
          this.armeService.updateArme(this.armeConcrete.id, dataImage);
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