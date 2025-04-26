/**
 * @fileoverview Komponent do przeglądania przepisów.
 * @module BrowsePageComponent
 */
/**
 * @description Komponent do przeglądania przepisów.
 * @property {Filter} filters - Aktualnie wybrane filtry.
 * @property {BehaviorSubject<Filter>} $filter - Obserwowalny strumień filtrów.
 * @property {recipeDto[]} recipes - Lista wyświetlanych przepisów.
 */
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { recipeDto } from '../../models/recipe-dto';
import { SingleRecipeComponent } from "../single-recipe/single-recipe.component";
import { CommonModule } from '@angular/common';
import { RecipeService, CuisineTag, DietTag } from '../../services/recipe.service';
import { page } from '../../models/page';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { map, Observable, debounceTime, distinctUntilChanged, switchMap, filter, BehaviorSubject } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { SideNavComponent } from '../side-nav/side-nav.component';
import { Filter } from '../../models/filter';
import { Tag } from '../../models/tag';
import { Input } from 'postcss';



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

  isLoading = false;

  filters: Filter = {
    ingredient: [],
    cuisine: [],
    diet: [],
    orderBy: '',
  };
  $filter = new BehaviorSubject<Filter>(this.filters);
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
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10];
  showFirstLastButtons = true;
  paginationDisable = false;

  constructor(private recipeService: RecipeService, private cuisineTag: CuisineTag, private dietTag: DietTag) { }

  ngOnInit() {

    this.getFilteredRecipes();
  }



  handlePageEvent(event: PageEvent) {
    this.paginationDisable = true;
    setTimeout(() => {
      this.paginationDisable = false;
    }, 1000);
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getFilteredRecipes();
  }

  // Getting recipes form app

  saveFilters(filters: Filter) {
    this.filters = filters;
    this.pageIndex = 0;
    this.getFilteredRecipes()
  }

  getFilteredRecipes() {
    this.isLoading = true;
    this.recipeService.getFilteredRecipes(this.filters, this.pageIndex + 1, this.pageSize).subscribe({
      next: (page: page<recipeDto>) => {
        this.recipes = page.results;
        this.length = page.pagination.total;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading filtered recipes:', err);
        this.isLoading = false;
      }
    });
  }

  addTag(event: Tag) {
    if (event.type === 'ingredient' && !this.filters.ingredient.includes(event.name)) {
      this.filters.ingredient.push(event.name);
    } else if (event.type === 'cuisine' && !this.filters.cuisine.includes(event.name)) {
      this.filters.cuisine.push(event.name);

    } else if (event.type === 'diet' && !this.filters.diet.includes(event.name)) {
      this.filters.diet.push(event.name);
    }
    this.$filter.next(this.filters);
  }
}
