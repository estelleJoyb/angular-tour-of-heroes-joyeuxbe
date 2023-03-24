import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArmesService } from '../armes.service';
import { Armes, ArmesConcrete } from '../data/armes';
@Component({
  selector: 'app-create-weapon',
  templateUrl: './create-weapon.component.html',
  styleUrls: ['./create-weapon.component.css']
})
export class CreateWeaponComponent implements OnInit {
  arme: ArmesConcrete;
  name: string;
  degats: number;
  attaque: number;
  esquive: number;
  usure: number;
  image: string;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private armesService: ArmesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.arme = new ArmesConcrete("","",0,0,0,0,"");
  }
  goBack(): void {
    this.location.back();//on quitte la page
  }

  Create(){
    this.arme.SetName(this.name);
    this.arme.SetAttaque(this.attaque);
    this.arme.SetDegats(this.degats);
    this.arme.SetEsquive(this.esquive);
    this.arme.SetImage(this.image);
    this.arme.SetUsure(this.usure);
    if(this.name != ""){
      this.armesService.createArme(this.arme);
    }
    this.location.back(); //on quitte la page
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

  UpdateUsure(usure: number){
    if(usure >=0){
      this.usure = usure;
    }
  }
}
