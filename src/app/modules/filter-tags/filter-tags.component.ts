/**
 * @fileoverview Komponent umożliwiający wyszukiwanie i filtrowanie przepisów.
 * @module FilterTagComponent
 */
/**
 * @description Komponent umożliwiający wyszukiwanie i filtrowanie przepisów.
 * @property {FormControl} ingredientCtrl - Kontrolka wyszukiwania składników.
 * @property {Observable<string[]>} filteredIngredients - Przefiltrowana lista składników.
 * // ...dalsze właściwości opisane w kodzie...
 */
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { CuisineTag, DietTag, RecipeService } from '../../services/recipe.service';
import { recipeDto } from '../../models/recipe-dto';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { page } from '../../models/page';
import { Filter } from '../../models/filter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

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
    MatTooltipModule,
    MatSelectModule,
  ],
  templateUrl: './filter-tags.component.html',
  styleUrls: ['./filter-tags.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FilterTagComponent implements OnInit {

  filters: Filter = {
    ingredient: [],
    cuisine: [],
    diet: [],
    orderBy: '',
  };

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

  // Recipes related (niezmienione)
  recipes: recipeDto[] = [];
  length = 500;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10];
  showFirstLastButtons = true;
  filterButtonDisable = false;
  clearButtonDisable = false;

  // Sortowanie
  allowedOrderFields: string[] = ["", "name", "cuisine", "ingredients_count"];
  selectedSortField: string = this.allowedOrderFields[0];
  sortAscending: boolean = true; // true = ascending, false = descending

  // Add aliases for display:
  orderAliases: Record<string, string> = {
    "": "Domyślnie",
    "name": "Nazwa Przepisu",
    "cuisine": "Kuchnia",
    "ingredients_count": "Ilość składników"
  };


  constructor(
    private recipeService: RecipeService,
    private cuisineTag: CuisineTag,
    private dietTag: DietTag,
    private router: Router
  ) { }

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
      switchMap(value => this.recipeService.getIngredients(value || '', 5, 1))
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
    // Initial setup with empty search to load all cuisines
    this.filteredCuisines = this.cuisineTag.getCuisines('');

    // Setup the valueChanges only for debouncing subsequent manual input
    this.cuisineCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(value => {
      // Only update when there's actual input
      if (value !== null) {
        this.filteredCuisines = this.cuisineTag.getCuisines(value || '');
      }
    });
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
    // Initial setup with empty search to load all diets
    this.filteredDiets = this.dietTag.getDiets('');

    // Setup the valueChanges only for debouncing subsequent manual input
    this.dietCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(value => {
      // Only update when there's actual input
      if (value !== null) {
        this.filteredDiets = this.dietTag.getDiets(value || '');
      }
    });
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


  // Zapis filtrów
  saveFilters() {
    this.filterButtonDisable = true;
    setTimeout(() => {
      this.filterButtonDisable = false;
    }, 1500);

    const sortParam = this.sortAscending ? this.selectedSortField : '-' + this.selectedSortField;
    this.filters.orderBy = sortParam;

    console.log('Wysyłamy zapytanie z filtrami:', this.filters);
    this.filtersEmitter.emit(this.filters);
  }


  // Resetowanie filtrów

  clearAllFilters() {
    this.clearButtonDisable = true;
    setTimeout(() => {
      this.clearButtonDisable = false;
    }, 1500);

    this.filters.ingredient = [];
    this.filters.cuisine = [];
    this.filters.diet = [];
    // Reset sortowania do ustawień domyślnych
    this.selectedSortField = this.allowedOrderFields[0];
    this.sortAscending = true;

    this.filtersEmitter.emit(this.filters);
  }

  // Navigation
  navigateToHome() {
    this.router.navigate(['/']);
  }
}
