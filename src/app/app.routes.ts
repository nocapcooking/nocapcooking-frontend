import { Routes } from '@angular/router';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { BrowsePageComponent } from './modules/browse-page/browse-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'browse', component: BrowsePageComponent }
];
