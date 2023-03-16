import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';

import { ArmeId, ArmesConcrete, Armes } from './data/armes';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { HeroConcrete } from './data/hero';
import { HeroService } from './hero.service';
@Injectable({
  providedIn: 'root'
})
export class ArmesService {
  private static url:string = 'armes';
  armeService: ArmesService;
  constructor(private readonly afs: AngularFirestore) { }
  
  getWeapons(): Observable<ArmeId[]> {
    let armesCollection = this.afs.collection<Armes>(ArmesService.url);
    let Armes: Observable<ArmeId[]> = armesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Armes;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    return Armes;
  }

  getWeaponsConcrete(): Observable<ArmesConcrete[]> {

    // Documentation AngularFire sur les collections
    // https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md
    let heroCollection = this.afs.collection<Armes>(ArmesService.url);

    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    let heroes: Observable<ArmesConcrete[]> = heroCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data: Armes = a.payload.doc.data() as Armes;
        const id: string = a.payload.doc.id;

        //
        let ArmesId: ArmeId = { id, ...data } as ArmeId;

        //
        return new ArmesConcrete(ArmesId.id, ArmesId.name, ArmesId.attaque, ArmesId.esquive, ArmesId.degats, ArmesId.usure, ArmesId.image);
      }))
    );

    return heroes;
  }

  getWeapon(armeId: string): Observable<Armes> {
    let armesDoc = this.afs.doc<Armes>(`${ArmesService.url}/${armeId}`);
    return armesDoc.get().pipe(
      map(doc => {
        if (doc.exists) {
          const data = doc.data() as ArmesConcrete;
          const id = doc.id;
          return { id, ...data };
        } else {
          throw new Error(`Hero with ID ${armeId} does not exist.`);
        }
      })
    );
  }


  getWeaponConcrete(armeId: string): Observable<ArmesConcrete> {
    let weaponDoc = this.afs.doc<ArmesConcrete>(`${ArmesService.url}/${armeId}`);
    return weaponDoc.get().pipe(
      map(doc => {
        if(doc.exists){
          const data = doc.data() as ArmesConcrete;
          const id = doc.id;
          let armeId: ArmeId = { id, ...data} as ArmeId;
          return new ArmesConcrete(armeId.id, armeId.name, armeId.attaque, armeId.esquive, armeId.degats, armeId.usure, armeId.image);
        }else{
          throw new Error(`Weapon with ID ${armeId} does not exist.`);
        }
      })
    );
  }

  updateArme(arme: string, data: Partial<ArmesConcrete>): Observable<void> {
    const armeDoc = this.afs.doc<ArmesConcrete>(`${ArmesService.url}/${arme}`);
    return from(armeDoc.update(data));
  }
}