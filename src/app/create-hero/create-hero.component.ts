import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from '../data/hero';
@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css']
})
export class CreateHeroComponent implements OnInit {
  hero: Hero;
  name: String;
  degats: Number;
  attaque: Number;
  esquive: Number;
  pv: Number;
  image: String;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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
        //const decoder = new TextDecoder('utf-8');
        //const stringImg = decoder.decode(arrayBuffer);
        //this.heroConcrete.setImage(arrayBuffer.toString());
        //const dataImage: Partial<HeroConcrete> = { image: this.heroConcrete.getImage()};
        //this.heroService.updateHero(this.heroConcrete.id, dataImage);
      }
      
    }
}
}
