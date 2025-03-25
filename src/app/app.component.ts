import { Component, OnInit } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule]
})

export class AppComponent implements OnInit {
  recipes: any[] = [];
  filters: any = {
    cuisine: [],
    diet: [],
    ingredient: [],
    exclude_cuisine: [],
    exclude_diet: [],
    exclude_ingredient: []
  };

  constructor(public recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes(10).subscribe({
      next: (data: any) => this.recipes = data,
      error: (error) => console.error(error)
    });
  }

  applyFilters() {
    this.recipeService.filterRecipes(this.filters).subscribe({
      next: (data: any) => this.recipes = data,
      error: (error) => console.error(error)
    });
  }

  updateFilter(type: string, value: string, isExclude = false) {
    const key = isExclude ? `exclude_${type}` : type;
    const index = this.filters[key].indexOf(value);
    
    if (index === -1) {
      this.filters[key].push(value);
    } else {
      this.filters[key].splice(index, 1);
    }
    
    this.applyFilters();
  }
}