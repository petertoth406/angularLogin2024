import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input()
  navButtons: NavButton[] = [
    {label: "Home", path: "home"},
    {label: "Swapi", path: "swapi"},
    {label: "Users", path: "users"},
    {label: "Product", path: "newProduct"},
    {label: "LogOut", path: null}
  ];

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    /*for(let button of this.navButtons){
      console.log(button)
      let btn = {
        label: "Alma",
        path: "fruit"
      }
    }*/
  }

  navTo(path: string | undefined | null){
    if(path)
      this.router.navigate([path])
    else{
      this.logout()
    }
  }
  logout(){
    this.loginService.logout()
  }

  
}

type NavButton = {
  label: string,
  path: string | undefined | null
}