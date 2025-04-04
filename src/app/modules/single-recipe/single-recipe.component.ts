import { Component, EventEmitter, Input, Output } from '@angular/core';
import { recipeDto } from '../../models/recipe-dto';
import { TagComponent } from "../tag/tag.component";
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Tag } from '../../models/tag';

@Component({
  selector: 'app-single-recipe',
  imports: [TagComponent, CommonModule],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css',
})
export class SingleRecipeComponent {
  imgUrl = environment.MEDIA_URL;
  audioUrl = environment.AUDIO_URL;
  @Input() recipe: recipeDto = {} as recipeDto;
  @Output() tagEmitter: EventEmitter<Tag> = new EventEmitter<Tag>();

  addTag(tag: Tag) {
    console.log('addTag', tag);
    this.tagEmitter.emit(tag);
  }
}
