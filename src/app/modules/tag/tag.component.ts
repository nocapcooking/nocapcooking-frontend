/**
 * @fileoverview Komponent wyświetlający pojedynczy tag.
 * @module TagComponent
 */
/**
 * @description Komponent odpowiedzialny za wyświetlanie pojedynczego tagu.
 */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../models/tag';

@Component({
  selector: 'app-tag',
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  @Input() name: string = '';
  @Input() type: string = '';
  @Output() addTag: EventEmitter<Tag> = new EventEmitter<Tag>();
  addFilter() {
    this.addTag.emit({ name: this.name, type: this.type });
  }
}
