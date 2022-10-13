import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subject, take } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit, OnDestroy {

  categories$;
  private ngUnsubscribe = new Subject();

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    detail: new FormControl('', Validators.required),
    price: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)/), Validators.min(1000)]),
    stock: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)/), Validators.min(-1)]),
    category: new FormControl('', [Validators.required, Validators.nullValidator]),
    imageUrl: new FormControl('', [Validators.required, Validators.pattern(/^(http(s)?:\/\/)/)]),
  });

  dataProduct!: IProduct;
  updateProduct = {
    id: 0,
    title: '',
    detail: '',
    price: 0,
    stock: 0,
    category: '',
    imageUrl: '',
  };
  submitted = false;
  isUpdate = false;
  id: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories().pipe(take(1));

    this.form.valueChanges.forEach(data => {
      console.log(data);
      this.dataProduct = data;
    })

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.isUpdate = true;
    if (this.id) this.productService.get(parseInt(this.id)).pipe(take(1)).subscribe(data => {
      this.updateProduct = data;
      console.log("success");
    })
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && !this.isUpdate) {
      this.productService.create(this.form.value).pipe(take(1)).subscribe(data => {
        console.log("save data success");
      });
      this.onReset();
    } else if (this.form.valid && this.isUpdate) {
      this.productService.update(this.id, this.form.value).pipe(take(1)).subscribe(data => {
        console.log("update success")
      })
      this.onReset();
      this.router.navigateByUrl('/admin/products');
    }
    console.log("invalid");
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();

  }
}
