import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { User } from 'firebase/auth';
@Component({
  selector: 'app-moncompte',
  templateUrl: './moncompte.component.html',
  styleUrls: ['./moncompte.component.css']
})
export class MoncompteComponent implements OnInit {
  usager : any;
  userName : string;
  userEmail: string;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthService
    //private userService: UserService
  ){}
  ngOnInit(): void {
    //this.auth.afAuth.currentUser
    //this.usager = this.auth.GetUser();
    //this.userName = this.userService.displayName;
    //this.userEmail = this.userEmail;
  }
}
