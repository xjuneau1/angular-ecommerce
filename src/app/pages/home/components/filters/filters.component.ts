import { Component, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import {Subscription} from "rxjs"
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: []
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory: EventEmitter<string> = new EventEmitter<string>()
  
  categories: Array<string> | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private storeService: StoreService){}

  ngOnInit(): void {
    this.storeService.getAllCategories()
      .subscribe((response)=> this.categories = response)
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe()
    }
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
