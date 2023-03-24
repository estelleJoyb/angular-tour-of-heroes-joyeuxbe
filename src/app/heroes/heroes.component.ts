import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Hero, HeroConcrete, HeroId } from '../data/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroesAsync?: Observable<HeroId[]>;
  heroesConcreteAsync?: Observable<HeroConcrete[]>;
  heroes: HeroId[];
  heroesConcrete: HeroConcrete[];
  constructor(
    private heroService: HeroService,
    private location: Location
    ) { 
    this.heroes = new Array();
  }

  ngOnInit(): void {
    this.getHeroes();
    this.getHeroesConcrete();
    this.getHeroesAsync();
    this.getHeroesConcreteAsync();
    
  }

  ngOnDestroy(): void{
    this.heroService.unsubscribeGetHeroe();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => {this.heroes = heroes});
  }
  getHeroesAsync(): void {
    this.heroesAsync = this.heroService.getHeroes();
  }

  getHeroesConcreteAsync(): void {
    this.heroesConcreteAsync = this.heroService.getHeroesConcrete();
  }
  getHeroesConcrete():void {
    this.heroService.getHeroesConcrete()
      .subscribe(heroesConcrete => {
        this.heroesConcrete = heroesConcrete;
        console.log(this.heroesConcrete[0].getImage());
      });
  }

  deleteHeroe(hero: string): void {
    this.heroService.deleteHero(hero);
  }
  
}