import { Hero } from './hero';
var hero1 = new Hero(2, 'Dr. Nice', 5, 5, 5, 10);
hero1.setImage("/assets/img/hero1.jpg");
var hero2 = new Hero(1, 'Celsius', 5, 5, 5, 10);
hero2.setImage("/assets/img/hero2.png");
var hero3 = new Hero(3, 'Bombasto', 5, 5, 5, 10);
hero3.setImage("/assets/img/hero3.png");
var hero4 = new Hero(4, 'Celeristas', 5, 5, 5, 10);
hero4.setImage("/assets/img/hero4.jpg");
var hero5 = new Hero(5, 'Magneta', 5, 5, 5, 10);
hero5.setImage("/assets/img/hero5.jpg");
var hero6 = new Hero(6, 'RubberMan', 5, 5, 5, 10);
hero6.setImage("/assets/img/hero6.jpg");
var hero7 = new Hero(7, "Dynama", 5,5,5,10);
hero7.setImage("/assets/img/hero7.jpg");
export const HEROES: Hero[] = [
    hero1,
    hero2,
    hero3,
    hero4,
    hero5,
    hero6,
    hero7
];