import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment} from '../../environments/environment'; 
import { recipeDto } from '../models/recipe-dto';
import { page } from '../models/page';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }

  getRecipes(page: number, per_page: number) {
    return this.http.get<page<recipeDto>>(`${environment.API_URL}/recipes/?page=${page}&per_page=${per_page}`);
  }

  filterRecipes(filters: any) {
    let params = new HttpParams();
    
    // Add filters
    ['cuisine', 'diet', 'ingredient'].forEach(key => {
      if (filters[key]) {
        filters[key].forEach((value: string) => {
          params = params.append(key, value);
        });
      }
    });

    // Add excludes
    ['exclude_cuisine', 'exclude_diet', 'exclude_ingredient'].forEach(key => {
      if (filters[key]) {
        filters[key].forEach((value: string) => {
          params = params.append(key, value);
        });
      }
    });

    return this.http.get(`${environment.API_URL}/recipes/filter/`, { params });
  }

  getIngredients(search: string, per_page: number, page: number) {
    return this.http.get<page<string>>(`${environment.API_URL}/ingredients`, {
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