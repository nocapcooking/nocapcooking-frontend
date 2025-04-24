/**
 * @fileoverview Interfejs reprezentujący dane przepisu.
 * @module RecipeDto
 */

/**
 * @description Interfejs reprezentujący dane przepisu.
 * @property {string} name - Nazwa przepisu.
 * @property {string} cuisine - Kuchnia, z której pochodzi przepis.
 * @property {string[]} diets - Lista diet, do których przepis jest odpowiedni.
 * @property {string[]} ingredients - Lista składników przepisu.
 * @property {string} recipe - Instrukcja przygotowania przepisu.
 * @property {string} image_path - Ścieżka do obrazu przepisu.
 * @property {string} audio_path - Ścieżka do pliku audio z przepisem.
 */
export interface recipeDto {
    name: string;
    cuisine: string;
    diets: string[];
    ingredients: string[];
    recipe: string;
    image_path: string;
    audio_path: string;
}