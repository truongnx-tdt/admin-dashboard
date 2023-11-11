import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { ProductAddComponent } from '../product-add/product-add.component';

const endpoint = 'https://jsonplaceholder.typicode.com/posts';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(private http: HttpClient, private dialog: MatDialog) {
  }
  //#region  fillter
  textFillter: any;
  allObject: any;
  filterResults() {
    if (!this.textFillter) {
      this.ngOnInit();
    }
    this.allObject = this.POSTS.filter((res: any) => {
      return res.title.toLowerCase().includes(this.textFillter.toLowerCase())
    }
    );
  }
  //#endregion
  //#region  sort data
  sortOrder: { key: string; reverse: boolean } = { key: '', reverse: false };

  sortObjects(key: string): void {
    console.log(key)
    this.sortOrder.reverse = !this.sortOrder.reverse;
    this.sortOrder.key = key;
    this.POSTS.sort((a: any, b: any) => {
      const valueA = a[key];
      const valueB = b[key];

      if (valueA < valueB) {
        return this.sortOrder.reverse ? 1 : -1;
      } else if (valueA > valueB) {
        return this.sortOrder.reverse ? -1 : 1;
      } else {
        return 0;
      }
    });
  }
  //#endregion
  //#region  get data
  fetchPosts(): void {
    this.getAllPosts().subscribe(
      (response) => {
        this.POSTS = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getAllPosts(): Observable<any> {
    return this.http.get(endpoint);
  }
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 20, 50];
  POSTS: any;
  onTableDataChange(event: any) {
    this.page = event;
    // this.POSTS = ELEMENT_DATA;
    // this.fetchPosts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.POSTS = ELEMENT_DATA;
    // this.fetchPosts();
  }
  //#endregion

  ngOnInit(): void {
    // this.POSTS = ELEMENT_DATA;
    this.fetchPosts();
    // this.tableSizes.push(ELEMENT_DATA.length);
  }


  //#region  delete product
  processDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  //#endregion

  //#region update product
  openDialogUpdate(data: any) {
    const dialogConfig = new MatDialogConfig();


    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.data = data;
    dialogConfig.enterAnimationDuration = '1000ms'
    dialogConfig.exitAnimationDuration = '500ms'

    const dialogRef = this.dialog.open(ProductUpdateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  //#endregion

  //#region add product
  openDialogAddProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    const diaRef = this.dialog.open(ProductAddComponent, dialogConfig);

    diaRef.afterClosed().subscribe(rs => {
      console.log('close add new product');
    })
  }
  //#endregion

}
