/**
 * @fileoverview Definicje interfejsów dla filtrów.
 * @description Zawiera definicję interfejsu Filter używanego do filtrowania składników, kuchni, diet oraz sortowania.
 */

/**
 * @interface Filter
 * @description Interfejs reprezentujący filtr dla wyszukiwania przepisów kulinarnych.
 */
export interface Filter {
	/**
	 * @property ingredient
	 * @description Lista składników, których należy użyć do filtrowania.
	 */
	ingredient: string[];
	/**
	 * @property cuisine
	 * @description Lista rodzajów kuchni, według których przefiltrować wyniki.
	 */
	cuisine: string[];
	/**
	 * @property diet
	 * @description Lista diet, które mają być brane pod uwagę przy filtrowaniu.
	 */
	diet: string[];
	/**
	 * @property orderBy
	 * @description Sposób sortowania wyników (np. według popularności, czasu przygotowania).
	 */
	orderBy: string;
}