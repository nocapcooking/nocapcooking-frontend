import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { recipeDto } from '../models/recipe-dto';
import { page } from '../models/page';
import { map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../models/api-response-general';

@Injectable({
  providedIn: 'root'
})
export class CuisineTag {
  private cuisinesCache: string[] = [];

  constructor(private http: HttpClient) { }

  // Retrieves cuisines either from the API or from cache.
  getCuisines(search: string): Observable<string[]> {
    if (this.cuisinesCache.length) {
      // Filter from cached list
      return of(
        this.filterCuisines(this.cuisinesCache, search)
      );
    } else {
      return this.http.get<string[]>(`${environment.API_URL}/cuisines/`).pipe(
        tap((cuisines: string[]) => {
          // console.log('API Response:', cuisines);
          this.cuisinesCache = cuisines;
        }),
        map((cuisines: string[]) => this.filterCuisines(cuisines, search))
      );
    }
  }

  // Helper method to filter cuisines with search string.
  private filterCuisines(cuisines: string[], search: string): string[] {
    const lowerSearch = search.toLowerCase();
    return cuisines.filter(cuisine =>
      cuisine.toLowerCase().includes(lowerSearch)
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class DietTag {
  private dietsCache: string[] = [];

  constructor(private http: HttpClient) { }

  // Retrieves cuisines either from the API or from cache.
  getDiets(search: string): Observable<string[]> {
    if (this.dietsCache.length) {
      // Filter from cached list
      return of(
        this.filterDiets(this.dietsCache, search)
      );
    } else {
      return this.http.get<string[]>(`${environment.API_URL}/diets/`).pipe(
        tap((cuisines: string[]) => {
          // console.log('API Response:', cuisines);
          this.dietsCache = cuisines;
        }),
        map((cuisines: string[]) => this.filterDiets(cuisines, search))
      );
    }
  }

  // Helper method to filter cuisines with search string.
  private filterDiets(diets: string[], search: string): string[] {
    const lowerSearch = search.toLowerCase();
    return diets.filter(diet =>
      diet.toLowerCase().includes(lowerSearch)
    );
  }
}



@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  // Deprecated: Use getFilteredRecipes instead
  getRecipes(page: number, per_page: number) {
    return this.http.get<page<recipeDto>>(`${environment.API_URL}/recipes/?page=${page}&per_page=${per_page}`);
  }

  getFilteredRecipes(filters: any, page: number, per_page: number) {
    // Start with base URL
    let url = `${environment.API_URL}/recipes/filter/?`;

    // Add pagination parameters
    url += `page=${page}&per_page=${per_page}`;

    // Add filters
    ['cuisine', 'diet', 'ingredient'].forEach(key => {
      if (filters[key]) {
        filters[key].forEach((value: string) => {
          url += `&${key}=${encodeURIComponent(value)}`;
        });
      }
    });

    // Add sorting parameters
    ['name', 'cuisine', 'ingredients_count', '-name', '-cuisine', '-ingredients_count'].forEach(key => {
      if (filters.orderBy === key) {
        url += `&order_by=${key}`;
      }
    });

    // Add excludes
    ['exclude_cuisine', 'exclude_diet', 'exclude_ingredient'].forEach(key => {
      if (filters[key]) {
        filters[key].forEach((value: string) => {
          // Remove 'exclude_' prefix for the API
          const paramName = key.replace('exclude_', '');
          url += `&${paramName}=${encodeURIComponent(value)}`;
        });
      }
    });
    console.log('URL:', url);
    console.log('Filters:', filters);
    return this.http.get<page<recipeDto>>(url);

  }

  getIngredients(search: string, per_page: number, page: number) {
    return this.http.get<page<string>>(`${environment.API_URL}/ingredients/`, {
      params: {
        search: search,
        per_page: per_page.toString(),
        page: page.toString()
      }
    }).pipe(
      map(response => response.results)
    );
  }




}