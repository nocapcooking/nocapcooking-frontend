import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { recipeDto } from '../../models/recipe-dto';
import { SingleRecipeComponent } from "../single-recipe/single-recipe.component";
import { CommonModule } from '@angular/common';
import { RecipeService, CuisineTag, DietTag } from '../../services/recipe.service';
import { page } from '../../models/page';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { map, Observable, debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { SideNavComponent } from '../side-nav/side-nav.component';



@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-browse-page',
  standalone: true,
  imports: [
    SingleRecipeComponent,
    CommonModule,
    MatPaginatorModule,
    MatChipsModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    SideNavComponent
  ],
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.css']
})
export class BrowsePageComponent implements OnInit {


  // Ingredients
  ingredientCtrl = new FormControl('');
  filteredIngredients!: Observable<string[]>;
  selectedIngredients: string[] = [];

  // Cuisines
  cuisineCtrl = new FormControl('');
  filteredCuisines!: Observable<string[]>;
  selectedCuisines: string[] = [];

  // Diets
  dietCtrl = new FormControl('');
  filteredDiets!: Observable<string[]>;
  selectedDiets: string[] = [];

  // Recipes related
  recipes: recipeDto[] = [];
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;


  constructor(private recipeService: RecipeService, private cuisineTag: CuisineTag, private dietTag: DietTag) { }

  ngOnInit() {

    this.getRecipes();
  }



  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getRecipes();
  }

  // Getting recipes form ap



  getRecipes() {
    this.recipeService.getRecipes(this.pageIndex + 1, this.pageSize).subscribe({
      next: (page: page<recipeDto>) => {
        this.recipes = page.results;
      },
      error: (err) => {
        console.error('Error loading recipes:', err);
      }
    });
  }
  displayFilteredRecipes(recipesFiltered: page<recipeDto>) {
    this.recipes = recipesFiltered.results;
  
  }

}
