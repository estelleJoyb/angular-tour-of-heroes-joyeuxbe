import { Armes } from './armes';
var arme1 = new Armes(1,'Excalibur', 2,3,3,15);
arme1.SetImage("/assets/img/weapon1.png");

var arme2 = new Armes(2,'Enhance lance', 5,3,5,25)
arme2.SetImage("/assets/img/weapon2.png");

var arme3 = new Armes(3,'Holy Lance',6,4,6,30);
arme3.SetImage("/assets/img/weapon3.png");

var arme4 = new Armes(4,'Artemis Bow', 2,1,1,60);
arme4.SetImage("/assets/img/weapon4.png");

var arme5 = new Armes(5,'Mjolnir',11,2,9,22);
arme5.SetImage("/assets/img/weapon5.png");

var arme6 = new Armes(6,'Zulfiqar',13,16,7,46);
arme6.SetImage("/assets/img/weapon6.png");

var arme7 = new Armes(7,'Phoenix Ashes',7,7,7,7);
arme7.SetImage("/assets/img/weapon7.png");
export const ARMES: Armes[] = [
    arme1,
    arme2,
    arme3,
    arme4,
    arme5,
    arme6,
    arme7
];