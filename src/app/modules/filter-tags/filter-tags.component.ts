import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { CuisineTag, DietTag, RecipeService } from '../../services/recipe.service';
import { recipeDto } from '../../models/recipe-dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { page } from '../../models/page';


@Component({
  selector: 'app-filter-tags',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatChipsModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './filter-tags.component.html',
  styleUrl: './filter-tags.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FilterTagComponent implements OnInit {


  @Output() recipesFiltered: EventEmitter<page<recipeDto>> = new EventEmitter<page<recipeDto>>();
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
    this.setupIngredientSearch();
    this.setupCuisineSearch();
    this.setupDietSearch();
  }

  // Ingredients
  private setupIngredientSearch() {
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.recipeService.getIngredients(value || '', 10, 1))
    );
  }

  addIngredient(ingredient: string) {
    if (!this.selectedIngredients.includes(ingredient)) {
      this.selectedIngredients.push(ingredient);
    }
    this.ingredientCtrl.setValue('');
  }

  removeIngredient(ingredient: string) {
    const index = this.selectedIngredients.indexOf(ingredient);
    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
    }
  }

  // Cuisines



  private setupCuisineSearch() {
    this.filteredCuisines = this.cuisineCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.cuisineTag.getCuisines(value || ''))
    );
  }

  addCuisine(cuisine: string) {
    if (!this.selectedCuisines.includes(cuisine)) {
      this.selectedCuisines.push(cuisine);
    }
    this.cuisineCtrl.setValue('');
  }

  removeCuisine(cuisine: string) {
    const index = this.selectedCuisines.indexOf(cuisine);
    if (index >= 0) {
      this.selectedCuisines.splice(index, 1);
    }
  }

  // Diets

  private setupDietSearch() {
    this.filteredDiets = this.dietCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.dietTag.getDiets(value || ''))
    );
  }

  addDiet(diet: string) {
    if (!this.selectedDiets.includes(diet)) {
      this.selectedDiets.push(diet);
    }
    this.dietCtrl.setValue('');
  }

  removeDiet(diet: string) {
    const index = this.selectedDiets.indexOf(diet);
    if (index >= 0) {
      this.selectedDiets.splice(index, 1);
    }
  }



  getFilteredRecipes() {
    const hasIngredients = this.selectedIngredients && this.selectedIngredients.length > 0;
    const hasCuisines = this.selectedCuisines && this.selectedCuisines.length > 0;
    const hasDiets = this.selectedDiets && this.selectedDiets.length > 0;

    if (!hasIngredients && !hasCuisines && !hasDiets) {
      console.log('No filters selected, API call skipped.');
      return;
    }
    const filter: any = {};

    if (hasIngredients) {
      filter.ingredient = this.selectedIngredients;
    }
    if (hasCuisines) {
      filter.cuisine = this.selectedCuisines;
    }
    if (hasDiets) {
      filter.diet = this.selectedDiets;
    }

    filter.page = this.pageIndex + 1;

    this.recipeService.getFilteredRecipes(filter, filter.page, this.pageSize).subscribe({
      next: (page: page<recipeDto>) => {
        this.recipesFiltered.emit(page);

        console.log('Filtered recipes response:', page);
        this.recipes = page.results;
      },
      error: (err) => {
        console.error('Error loading filtered recipes:', err);
      }
    });
  }

}