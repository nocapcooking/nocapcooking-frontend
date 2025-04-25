/**
 * @module ApiResponseGeneral
 * @description Ogólny interfejs odpowiedzi API używany w całej aplikacji.
 *
 * @template T - Typ elementów zwracanych w odpowiedzi.
 */
export interface ApiResponse<T> {
    /**
     * Tablica wyników zwróconych przez API.
     */
    results: T[];
}