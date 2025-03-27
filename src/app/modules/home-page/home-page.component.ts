import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private router: Router){
    
  }

  redirect(){
    console.log('redicted from home page to browse page'); 
    this.router.navigate(['/browse']);
  }
  welcomeMessage = signal('Welcome to home page of NoCapCooking');

}
