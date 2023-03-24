import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero, HeroConcrete } from '../data/hero';
@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css']
})
export class CreateHeroComponent implements OnInit {
  hero: HeroConcrete;
  name: string;
  degats: number;
  attaque: number;
  esquive: number;
  pv: number;
  image: string;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.hero = new HeroConcrete("","",0,0,0,0,"");
  }
  goBack(): void {
    this.location.back();//on quitte la page
  }

  Create(){
    this.hero.setName(this.name);
    this.hero.setAttaque(this.attaque);
    this.hero.setDegats(this.degats);
    this.hero.setEsquive(this.esquive);
    this.hero.setImage(this.image);
    this.hero.setPv(this.pv);
    if(this.name != ""){
      this.heroService.createHero(this.hero);
    }
    this.location.back();//on quitte la page
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
      if(reader.result != null){
        const arrayBuffer = reader.result; 
        this.image = arrayBuffer.toString();
      }
    }
  }
  UpdateName(name : string){
    if(name != ""){
      this.name = name;
    }
  }
  UpdateAttaque(attaque : number){
    if(attaque >= 0){
      this.attaque = attaque;
    }
  }

  UpdateDegats(degats: number){
    if(degats >= 0){
      this.degats = degats;
    }
  }
  

  UpdateEsquive(esquive: number){
    if(esquive >=0){
      this.esquive = esquive;
    }
  }

  UpdatePv(pv: number){
    if(pv >=0){
      this.pv = pv;
    }
  }
}
