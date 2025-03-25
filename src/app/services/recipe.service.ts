import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment} from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }

  getRecipes(amount: number) {
    return this.http.get(`${environment.API_URL}/recipes/?amount=${amount}`);
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
}