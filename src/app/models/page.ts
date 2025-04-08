/**
 * @fileoverview Interfejsy do reprezentacji stron wyników i danych paginacyjnych.
 * @description Plik zawiera definicje interfejsów 'page' oraz 'Pagination', używanych do operacji paginacyjnych.
 */

import { recipeDto } from "./recipe-dto";

/**
 * @interface page
 * @description Interfejs reprezentujący stronę wyników wraz z danymi paginacyjnymi.
 * @property {T[]} results - Tablica wyników typu T.
 * @property {Pagination} pagination - Obiekt zawierający szczegóły paginacji.
 */
export interface page<T> {
    results: T[];
    pagination: Pagination;
}

/**
 * @interface Pagination
 * @description Interfejs definiujący właściwości paginacji.
 * @property {number} total - Łączna liczba wyników.
 * @property {number} per_page - Liczba wyników na stronę.
 * @property {number} current_page - Numer bieżącej strony.
 * @property {number} total_pages - Łączna liczba stron.
 * @property {boolean} has_next - Wskazuje, czy istnieje następna strona.
 * @property {boolean} has_previous - Wskazuje, czy istnieje poprzednia strona.
 */
export interface Pagination {
    total: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
}