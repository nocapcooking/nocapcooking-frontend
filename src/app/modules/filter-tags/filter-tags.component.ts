import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
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
import { Filter } from '../../models/filter';


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

  filters: Filter = {
    ingredient: [],
    cuisine: [],
    diet: []
  }
  @Input() filtersObservable = new BehaviorSubject<Filter>({} as Filter).asObservable();
  @Output() filtersEmitter: EventEmitter<Filter> = new EventEmitter<Filter>();
  // Ingredients
  ingredientCtrl = new FormControl('');
  filteredIngredients!: Observable<string[]>;

  // Cuisines
  cuisineCtrl = new FormControl('');
  filteredCuisines!: Observable<string[]>;

  // Diets
  dietCtrl = new FormControl('');
  filteredDiets!: Observable<string[]>;

  // Recipes related
  recipes: recipeDto[] = [];
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;


  constructor(private recipeService: RecipeService, private cuisineTag: CuisineTag, private dietTag: DietTag) { }

  ngOnInit() {
    this.filtersObservable.subscribe((filters: Filter) => {
      this.filters = filters;
    });
  
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
    if (!this.filters.ingredient.includes(ingredient)) {
      this.filters.ingredient.push(ingredient);
    }
    this.ingredientCtrl.setValue('');
  }

  removeIngredient(ingredient: string) {
    const index = this.filters.ingredient.indexOf(ingredient);
    if (index >= 0) {
      this.filters.ingredient.splice(index, 1);
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
    if (!this.filters.cuisine.includes(cuisine)) {
      this.filters.cuisine.push(cuisine);
    }
    this.cuisineCtrl.setValue('');
  }

  removeCuisine(cuisine: string) {
    const index = this.filters.cuisine.indexOf(cuisine);
    if (index >= 0) {
      this.filters.cuisine.splice(index, 1);
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
    if (!this.filters.diet.includes(diet)) {
      this.filters.diet.push(diet);
    }
    this.dietCtrl.setValue('');
  }

  removeDiet(diet: string) {
    const index = this.filters.diet.indexOf(diet);
    if (index >= 0) {
      this.filters.diet.splice(index, 1);
    }
  }



  saveFilters() {
    this.filtersEmitter.emit(this.filters);

  }
    

}