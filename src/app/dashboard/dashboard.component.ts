import { Component, OnInit } from '@angular/core';
import { Hero, HeroConcrete } from '../data/hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: HeroConcrete[] = [];

  constructor(private heroService: HeroService) { this.heroes = new Array(); }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroesConcrete()
      .subscribe(heroes => {this.heroes = heroes.slice(1, 5)});
  }

  
}