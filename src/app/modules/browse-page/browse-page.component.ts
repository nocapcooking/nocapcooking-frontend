import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { recipeDto } from '../../models/recipe-dto';
import { SingleRecipeComponent } from "../single-recipe/single-recipe.component";
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { page } from '../../models/page';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { map, Observable, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
  ],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.css'
})
export class BrowsePageComponent implements OnInit {
  ingredientCtrl = new FormControl('');
  filteredIngredients: Observable<string[]> = new Observable<string[]>();
  selectedIngredients: string[] = [];
  
  recipes: recipeDto[] = [];
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.setupIngredientSearch();
    this.getRecipes();
  }

  private setupIngredientSearch() {
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      debounceTime(300), // wait 300ms after each keystroke
      distinctUntilChanged(), // ignore if same as previous value
      switchMap(value => this.recipeService.getIngredients(value || '', 10,1))
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

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getRecipes();
  }

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
}