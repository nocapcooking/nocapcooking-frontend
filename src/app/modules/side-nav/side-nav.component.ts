import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterTagComponent } from "../filter-tags/filter-tags.component";
import { CommonModule } from '@angular/common';
import { page } from "../../models/page";
import { recipeDto } from "../../models/recipe-dto";
import { Filter } from "../../models/filter";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrl: 'side-nav.component.css',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatFormFieldModule, FilterTagComponent, CommonModule],
})
export class SideNavComponent  {
  
  showFiller = false;
  isExpanded = true;
  @Output() filtersEmmiter: EventEmitter<Filter> = new EventEmitter<Filter>();
  @Input() filtersObservable = new BehaviorSubject<Filter>({} as Filter).asObservable();

  

  toggleDrawer() {
    this.isExpanded = !this.isExpanded;
  }
  saveFilters(filters: Filter) {
    this.filtersEmmiter.emit(filters);
  }
}


