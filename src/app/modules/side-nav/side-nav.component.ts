import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterTagComponent } from "../filter-tags/filter-tags.component";
import { CommonModule } from '@angular/common';
import { page } from "../../models/page";
import { recipeDto } from "../../models/recipe-dto";

@Component({
  selector: 'side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrl: 'side-nav.component.css',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatFormFieldModule, FilterTagComponent, CommonModule],
})
export class SideNavComponent {
  showFiller = false;
  isExpanded = true;
  @Output() recipesFiltered: EventEmitter<page<recipeDto>> = new EventEmitter<page<recipeDto>>();
  toggleDrawer() {
    this.isExpanded = !this.isExpanded;
  }
  displayFilteredRecipes(recipesFiltered: page<recipeDto>) {
    this.recipesFiltered.emit(recipesFiltered);
  }
}


