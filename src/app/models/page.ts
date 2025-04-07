import { recipeDto } from "./recipe-dto";

export interface page<T>{
    results: T[];
    pagination: Pagination;
}
export interface Pagination {
    total: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
  }