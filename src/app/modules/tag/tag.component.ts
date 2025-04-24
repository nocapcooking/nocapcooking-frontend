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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tag',
  imports: [CommonModule,
  ],
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
