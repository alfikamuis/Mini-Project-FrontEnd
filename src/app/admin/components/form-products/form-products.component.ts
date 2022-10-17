import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subject, take } from 'rxjs';
import { ICategory } from 'src/app/shared/models/category';
import { IProduct } from 'src/app/shared/models/product';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {

  categories!: ICategory[];
  // private ngUnsubscribe = new Subject();

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)/), Validators.min(-1)]),
    quantity: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)/), Validators.min(-1)]),
    category: new FormControl('', [Validators.required, Validators.nullValidator]),
    image: new FormControl('', [Validators.required, Validators.pattern(/^(http(s)?:\/\/)/)]),
  });


  dataProduct!: IProduct;
  updateProduct: IProduct = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: null,
    image: "../../../../assets/img/dummy-product_2.png",
    images: '',
  };

  submitted = false;
  isUpdate = false;
  id: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.form.valueChanges.forEach(data => {
      this.dataProduct = data;
    })

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.isUpdate = true;
    if (this.id) this.productService.get(parseInt(this.id)).subscribe(data => {
      this.updateProduct = data;
    })

  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.categoryService.getCategories().pipe(take(1)).subscribe((data:any) =>{
      this.categories = data.users;
    })

    this.form.setValue({category:null})
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && !this.isUpdate) {
      this.productService.create(this.form.value).pipe(take(1)).subscribe(data => {
        console.log(this.form.value)
        alert("save data success");
        next:(this.router.navigateByUrl('/admin/products'));
      });
      this.onReset();
    } else if (this.form.valid && this.isUpdate) {
      console.log(this.form.value)
      this.productService.update(this.id, this.form.value).pipe(take(1)).subscribe(data => {
        alert("update success");
        next:(this.router.navigateByUrl('/admin/products'));
      })
      this.onReset();
    } 
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();

  }
}
