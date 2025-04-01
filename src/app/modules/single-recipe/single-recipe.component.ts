import { Component, Input } from '@angular/core';
import { recipeDto } from '../../models/recipe-dto';
import { TagComponent } from "../tag/tag.component";
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-single-recipe',
  imports: [TagComponent, CommonModule],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css',
})
export class SingleRecipeComponent {
  url = environment.MEDIA_URL;
  @Input() recipe: recipeDto = {} as recipeDto;

}
