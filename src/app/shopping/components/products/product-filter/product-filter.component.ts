import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ICategory } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  @Input('category') category!: string | null;

  categories: ICategory[]=[]
  constructor(
    private categoryService: CategoryService,) { }

  ngOnInit(): void {
    this.categoryService.getCategories().pipe(take(1)).subscribe((data:any) =>{
      this.categories = data.users;
    })
  }

}
