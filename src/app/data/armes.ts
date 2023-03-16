

export interface Armes{
    name: string;
    attaque: number;
    esquive: number;
    degats: number;
    usure: number;
    image: string;
}

export interface ArmeId extends Armes{
    id: string;
}

export class ArmesConcrete implements ArmeId {
    id: string;
    name: string;
    attaque: number;
    esquive: number;
    degats: number;
    usure: number;
    image: string;
    constructor(id:string, name:string, attaque: number, esquive: number, degats: number, usure: number, image: string){
        this.id = id;
        this.name = name;
        this.attaque = attaque;
        this.esquive = esquive;
        this.degats = degats;
        this.usure = usure;
        this.image = image;
    }

    //Setters
    SetName(name : string):void {
        this.name = name;
    }
    SetAttaque(attaque :number):void {
        this.attaque = attaque;
    }
    SetEsquive(esquive :number): void {
        this.esquive = esquive;
    }
    SetDegats(degats : number):void {
        this.degats = degats;
    }
    SetUsure(usure : number):void {
        this.usure = usure;
    }
    SetImage(image : string):void {
        this.image = image;
    }
    //getters
    GetName():string {
        return this.name;
    }
    GetAttaque():number {
        return this.attaque;
    }
    GetEsquive():number{
        return this.esquive;
    }
    GetDegats():number{
        return this.degats;
    }
    GetUsure():number{
        return this.usure;
    }
    GetImage():string {
        return this.image;
    }
    //methodes

    /*
        Une arme est utilisable si son usure est > 0
    */
    EstUtilisable():boolean{
        if(this.usure > 0){
            return true; //elle est utilisable
        }else{
            return false; //elle est foutue
        }
    }
}