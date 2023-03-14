
import { Armes, ArmesConcrete } from '../data/armes';
export interface Hero{
    name: string;
    attaque: number;
    esquive: number;
    degats: number;
    pv : number;
    image :string;
    armes : Armes[];
}

export interface HeroId extends Hero{
    id: string;
}

export class HeroConcrete implements HeroId {
    id: string;
    name: string;
    attaque: number;
    esquive: number;
    degats: number;
    pv : number;
    image :string;
    armes : ArmesConcrete[];
    constructor(id : string, name : string, attaque : number, esquive : number, degats : number, pv: number){
        this.id = id;
        this.name = name;
        this.attaque = attaque;
        this.esquive = esquive;
        this.degats = degats;
        this.pv = pv;
        this.image = "";
        this.armes = [];
    }
    //setters
    setName(name : string): void {
        this.name = name;
    }
    setAttaque(attaque: number):void {
        if(attaque >= 0){
            this.attaque = attaque;
        }else{
            this.attaque = 0;
        }
        
    }
    setEsquive(esquive: number):void{
        if(esquive >= 0){
            this.esquive = esquive;
        }else{
            this.esquive = 0;
        }
    }
    setDegats(degats: number):void {
        if(degats >= 0){
            this.degats = degats;
        }else{
            this.degats = 0;
        }
    }
    setPv(pv: number):void{
        if(pv >= 0){
            this.pv = pv;
        }else{
            this.pv = 0;
        }
    }
    setImage(image :string): void{
        this.image = image;
    }
    //getters
    getName():string {
        return this.name;
    }
    getAttaque():number {
        //il faut qu'on parcoure les armes pour savoir
        var attaque = this.attaque;
        this.armes.forEach(arme => {
            if(arme.EstUtilisable()){
                attaque += arme.GetAttaque();
            }
        });
        return attaque;
    }
    getEsquive():number {
        //il faut qu'on parcoure les armes pour savoir
        var esquive = this.esquive;
        this.armes.forEach(arme => {
            if(arme.EstUtilisable()){
                esquive += arme.GetEsquive();
            }
        });
        return esquive;
    }
    getDegats():number {
        //il faut qu'on parcoure les armes pour savoir
        var degats = this.degats;
        this.armes.forEach(arme => {
            if(arme.EstUtilisable()){
                degats += arme.GetDegats();
            }
        });
        return degats;
    }
    getPv():number{
        return this.pv;
    }
    getImage():string{
        return this.image;
    }
    // retourne un boolean true si le hero est vivant ou false sinon
    EstVivant():boolean{
        if(this.pv == 0){ // points de vie à 0
            return false; //il est mort
        }else{
            return true; //il est vivant
        }
    }

    //prérequis : le héro qu'on attaque doit etre vivant
    //prend en paramètre un hero et lui mets les dégats
    Attaque(hero : HeroConcrete):void {
        this.armes.forEach(arme => {
            if(arme.EstUtilisable()){
                arme.SetUsure(arme.GetUsure()-1); //on use nos armes
            }
        });
        if((hero.getPv() - (this.getDegats()-hero.getEsquive())) >= 0){ 
            // il ne vas pas mourrir sous notre attaque
            hero.setPv(this.getDegats()-hero.getEsquive());
        }else{
            //il est mort
            hero.setPv(0); //on set ses points de vie à 0
        }
    }

    //ajoute une arme au héro et retourne void
    AddArme(arme: ArmesConcrete):void{
        this.armes.push(arme); //ajoute l'arme à l'array d'arme
    }

    /*  prends en parametre une arme 
        supprime l'arme (si elle exite) des armes du joueur
        renvoie void
    */
    RemoveArme(arme: ArmesConcrete):void{
        var index = this.armes.indexOf(arme);
        if(index > -1){//l'index a été trouvé
            this.armes.splice(index, 1); //arme supprimée des armes du joueur
        }
    }
}