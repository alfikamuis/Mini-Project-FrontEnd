import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  @Input('category') category!: string | null;

  constructor(
    private categoryService: CategoryService,) { }

  categories$ = this.categoryService.getCategories().pipe(take(1));

  ngOnInit(): void {
  }

}
