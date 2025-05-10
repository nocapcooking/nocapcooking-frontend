/**
 * @fileoverview Komponent strony głównej.
 * @module HomePageComponent
 */
/**
 * @description Komponent strony głównej.
 * @property {Router} router - Serwis do nawigacji.
 * @property {signal} welcomeMessage - Wiadomość powitalna.
 */
import { Component, signal, inject } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DisclaimerDialogComponent } from '../disclaimer-dialog/disclaimer-dialog.component';

@Component({
  selector: 'app-home-page',
  imports: [MatDialogModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  readonly dialog = inject(MatDialog);

  constructor(private router: Router) {

  }

  redirect() {
    console.log('redicted from home page to browse page');
    this.router.navigate(['/browse']);
  }
  welcomeMessage = signal('Idź do strony z przepisami');

  openDialog() {
    const dialogRef = this.dialog.open(DisclaimerDialogComponent);

    dialogRef.afterClosed().subscribe()
  }

}
