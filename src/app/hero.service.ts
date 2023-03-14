import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { Hero, HeroConcrete, HeroId } from './data/hero';
import { Armes } from './data/armes';
import { ArmesService } from './armes.service';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({ providedIn: 'root' })
export class HeroService {
  private static url:string = 'heroes';
  armeService: ArmesService;
  constructor(private readonly afs: AngularFirestore) { }
  
  getHeroes(): Observable<HeroId[]> {
    let heroCollection = this.afs.collection<Hero>(HeroService.url);
    let heroes: Observable<HeroId[]> = heroCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Hero;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    return heroes
  }

  getHeroesConcrete(): Observable<HeroConcrete[]> {

    // Documentation AngularFire sur les collections
    // https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md
    let heroCollection = this.afs.collection<Hero>(HeroService.url);

    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    let heroes: Observable<HeroConcrete[]> = heroCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data: Hero = a.payload.doc.data() as Hero;
        const id: string = a.payload.doc.id;

        //
        let heroId: HeroId = { id, ...data } as HeroId;

        //
        return new HeroConcrete(heroId.id, heroId.name, heroId.attaque, heroId.esquive, heroId.degats, heroId.pv);
      }))
    );

    return heroes;
  }

  getHero(heroId: string): Observable<Hero> {
    let heroDoc = this.afs.doc<Hero>(`${HeroService.url}/${heroId}`);
    return heroDoc.get().pipe(
      map(doc => {
        if (doc.exists) {
          const data = doc.data() as Hero;
          const id = doc.id;
          return { id, ...data };
        } else {
          throw new Error(`Hero with ID ${heroId} does not exist.`);
        }
      })
    );
  }

  getHeroConcrete(heroId: string): Observable<HeroConcrete> {
    let heroDoc = this.afs.doc<HeroConcrete>(`${HeroService.url}/${heroId}`);
    return heroDoc.get().pipe(
      map(doc => {
        if (doc.exists) {
          const data = doc.data() as HeroConcrete;
          const id = doc.id;
          let heroId: HeroId = { id, ...data } as HeroId;
          return new HeroConcrete(heroId.id, heroId.name, heroId.attaque, heroId.esquive, heroId.degats, heroId.pv);
        } else {
          throw new Error(`Hero with ID ${heroId} does not exist.`);
        }
      })
    );
  }

  

}