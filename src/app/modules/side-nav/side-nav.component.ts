/**
 * @fileoverview Komponent panelu bocznego umożliwiający wybór filtrów.
 * @module SideNavComponent
 */
/**
 * @description Komponent panelu bocznego, umożliwiający wybór filtrów.
 * @property {boolean} showFiller - Flaga do wyświetlania wypełniacza.
 * @property {EventEmitter<Filter>} filtersEmmiter - Emiter wybranych filtrów.
 * @property {Observable<Filter>} filtersObservable - Obserwowalne zmiany filtrów.
 */
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class SideNavComponent implements OnInit {

  isMobile: boolean = false;
  isExpanded: boolean = true;
  showFiller = false;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 768; // Set the breakpoint for mobile screens
    // Automatically close the drawer when transitioning to mobile
    if (this.isMobile) {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }
  }

  ngOnInit() {
    this.onResize(); // Initialize on page load
  }


  @Output() filtersEmmiter: EventEmitter<Filter> = new EventEmitter<Filter>();
  @Input() filtersObservable = new BehaviorSubject<Filter>({} as Filter).asObservable();



  toggleDrawer() {
    this.isExpanded = !this.isExpanded;
  }
  saveFilters(filters: Filter) {
    this.filtersEmmiter.emit(filters);
  }
}


