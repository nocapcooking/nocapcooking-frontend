/**
 * @fileoverview Komponent wyświetlający pojedynczy przepis.
 * @module SingleRecipeComponent
 */

/**
 * @description Komponent wyświetlający pojedynczy przepis.
 * @property {string} imgUrl - Bazowy URL do obrazów.
 * @property {string} audioUrl - Bazowy URL do plików audio.
 * @property {recipeDto} recipe - Dane przepisu.
 * @property {EventEmitter<Tag>} tagEmitter - Emiter zdarzenia dodania tagu.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { recipeDto } from '../../models/recipe-dto';
import { TagComponent } from "../tag/tag.component";
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Tag } from '../../models/tag';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-single-recipe',
  imports: [TagComponent, CommonModule, MatIconModule],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css',
})
export class SingleRecipeComponent {
  imgUrl = environment.MEDIA_URL;
  audioUrl = environment.AUDIO_URL;
  audioUnlocked = false;
  @Input() recipe: recipeDto = {} as recipeDto;
  @Output() tagEmitter: EventEmitter<Tag> = new EventEmitter<Tag>();

  addTag(tag: Tag) {
    console.log('addTag', tag);
    this.tagEmitter.emit(tag);
  }

  encode(url: string) {
    const lastSlashIndex = url.lastIndexOf('/');
    const prefix = url.substring(0, lastSlashIndex + 1);
    const fileName = url.substring(lastSlashIndex + 1);
    return prefix + fileName.normalize('NFD');
  }

  showAudio() {
    this.audioUnlocked = true;
  }
}
