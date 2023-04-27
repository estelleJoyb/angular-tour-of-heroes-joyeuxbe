import { Component, OnInit, SimpleChange } from '@angular/core';
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
  heroesConcrete: HeroConcrete[];
  selectedvalueattackfilter: string = '';
  selectedvaluedamagefilter: string = '';
  selectedvaluedodgefilter: string = '';
  selectedvaluepvfilter: string = '';
  heroesAsync?: Observable<HeroId[]>;
  heroesConcreteAsync?: Observable<HeroConcrete[]>;
  heroes: HeroId[];
  
  heroesTemp: HeroConcrete[];
  constructor(
    private heroService: HeroService,
    private location: Location
    ) { 
    this.heroes = new Array();
  }

  ngOnInit(): void {
    console.log('init my heroes');
    this.getHeroes();
    this.getHeroesConcrete();
    this.getHeroesAsync();
    this.getHeroesConcreteAsync();
    this.heroesTemp = new Array();
  }

  ngOnDestroy(): void{
    this.heroService.unsubscribeGetHeroe();
  }

  ngOnChanges():void{

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

  //j'ai un problème avec ces méthodes. Elles fonctionnent mais comme l'application est one-page, elle ne raffraîchit pas l'affichage 
  //quand la liste de héro change (this.heroesConcrete)
  //c'est un petit peu embêtant pour le tri...

  mostDamage():void{
    console.log("selected damage filter : "+this.selectedvaluedamagefilter);
    this.heroesTemp = new Array();
    this.getHeroesConcrete();
    this.heroesConcrete.forEach(hero => {
      if(hero.getAttaque() > Number(this.selectedvalueattackfilter) && hero.getDegats() > Number(this.selectedvaluedamagefilter && hero.getEsquive() > Number(this.selectedvaluedodgefilter) && hero.getPv() > Number(this.selectedvaluepvfilter))){
        this.heroesTemp.push(hero);
      }
    });
    this.heroesConcrete = new Array();
    this.heroesConcrete = this.heroesTemp;
  }
  mostAttack(){
    console.log("selected attack filter : "+this.selectedvalueattackfilter);
    this.heroesTemp = new Array();
    this.getHeroesConcrete();
    this.heroesConcrete.forEach(hero => {
      if(hero.getAttaque() > Number(this.selectedvalueattackfilter) && hero.getDegats() > Number(this.selectedvaluedamagefilter && hero.getEsquive() > Number(this.selectedvaluedodgefilter) && hero.getPv() > Number(this.selectedvaluepvfilter))){
        this.heroesTemp.push(hero);
      }
    });
    this.heroesConcrete = new Array();
    this.heroesConcrete = this.heroesTemp;
  }
  
  mostDodge():void{
    console.log("selected dodge filter : "+this.selectedvaluedodgefilter);
    this.heroesTemp = new Array();
    this.getHeroesConcrete();
    this.heroesConcrete.forEach(hero => {
      if(hero.getAttaque() > Number(this.selectedvalueattackfilter) && hero.getDegats() > Number(this.selectedvaluedamagefilter && hero.getEsquive() > Number(this.selectedvaluedodgefilter) && hero.getPv() > Number(this.selectedvaluepvfilter))){
        this.heroesTemp.push(hero);
      }
    });
    this.heroesConcrete = new Array();
    this.heroesConcrete = this.heroesTemp;
  }
  mostPv():void{
    console.log("selected pv filter : "+this.selectedvaluepvfilter);
    if(this.selectedvaluepvfilter == ''){
      return;
    }
    this.heroesTemp = new Array();
    console.log(this.heroesTemp);
    this.getHeroesConcrete();
    this.heroesConcrete.forEach(hero => {
      if(hero.getPv() > Number(this.selectedvaluepvfilter)){
        this.heroesTemp.push(hero);
        console.log(hero.getPv());
      }
    });
    this.heroesConcrete = new Array();
    this.heroesConcrete = this.heroesTemp;
    console.log(this.heroesConcrete);
  }
}