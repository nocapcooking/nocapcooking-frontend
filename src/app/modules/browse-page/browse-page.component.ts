import { Component } from '@angular/core';
import { recipeDto } from '../../models/recipe-dto';
import { SingleRecipeComponent } from "../single-recipe/single-recipe.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse-page',
  imports: [SingleRecipeComponent, CommonModule],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.css'
})
export class BrowsePageComponent {
  
  recipes: recipeDto[] = [{
    name: 'Spaghetti Carbonara',
    cuisine: 'Italian',
    diet: ['Gluten Free', 'Vegetarian'],
    ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese','Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese','Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese','Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese'],
    recipe: 'Przygotuj spaghetti według metody al dente, aby makaron zachował idealną teksturę. W międzyczasie podsmaż pancettę na rozgrzanej oliwie, aż stanie się złocista i chrupiąca, co doda daniu gyatt charakteru. W osobnej misce ubij jajka z obficie startym parmezanem, dodaj szczyptę soli i świeżo zmielonego czarnego pieprzu. Po połączeniu makaronu z pancettą, powoli wlej mieszankę jajeczną, mieszając nieprzerwanie, aż sos zacznie rizzować jak sigma male. Pamiętaj, aby utrzymać grindset, bo tylko in ohio smak sprawi, że każde ugryzienie będzie bussing i inspirowane andrew tate stylem. Wskazówka: Dodaj odrobinę smurf cat humoru, by danie nabrało goon cave klimatu i było based.',
    photo: 'https://cloud.thedavesky.com/thumbnail/4d11dcbaf7284085bad5/1440/001_italian/calamari_fra_diavolo.jpg'
  },
  {
    name: 'Spaghetti Carbonara',
    cuisine: 'Italian',
    diet: ['Gluten Free', 'Vegetarian'],
    ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese'],
    recipe: 'Przygotuj spaghetti według metody al dente, aby makaron zachował idealną teksturę. W międzyczasie podsmaż pancettę na rozgrzanej oliwie, aż stanie się złocista i chrupiąca, co doda daniu gyatt charakteru. W osobnej misce ubij jajka z obficie startym parmezanem, dodaj szczyptę soli i świeżo zmielonego czarnego pieprzu. Po połączeniu makaronu z pancettą, powoli wlej mieszankę jajeczną, mieszając nieprzerwanie, aż sos zacznie rizzować jak sigma male. Pamiętaj, aby utrzymać grindset, bo tylko in ohio smak sprawi, że każde ugryzienie będzie bussing i inspirowane andrew tate stylem. Wskazówka: Dodaj odrobinę smurf cat humoru, by danie nabrało goon cave klimatu i było based.',
    photo: 'https://cloud.thedavesky.com/thumbnail/4d11dcbaf7284085bad5/1440/001_italian/calamari_fra_diavolo.jpg'
  },
  {
    name: 'Spaghetti Carbonara',
    cuisine: 'Italian',
    diet: ['Gluten Free', 'Vegetarian'],
    ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese'],
    recipe: 'Przygotuj spaghetti według metody al dente, aby makaron zachował idealną teksturę. W międzyczasie podsmaż pancettę na rozgrzanej oliwie, aż stanie się złocista i chrupiąca, co doda daniu gyatt charakteru. W osobnej misce ubij jajka z obficie startym parmezanem, dodaj szczyptę soli i świeżo zmielonego czarnego pieprzu. Po połączeniu makaronu z pancettą, powoli wlej mieszankę jajeczną, mieszając nieprzerwanie, aż sos zacznie rizzować jak sigma male. Pamiętaj, aby utrzymać grindset, bo tylko in ohio smak sprawi, że każde ugryzienie będzie bussing i inspirowane andrew tate stylem. Wskazówka: Dodaj odrobinę smurf cat humoru, by danie nabrało goon cave klimatu i było based.',
    photo: 'https://cloud.thedavesky.com/thumbnail/4d11dcbaf7284085bad5/1440/001_italian/calamari_fra_diavolo.jpg'
  }]

  constructor(){  
  }
}
