import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  /**
   *
   */
  constructor(
    public dialogRef: MatDialogRef<ProductAddComponent>) {

  }

  closePopUp() {
    this.dialogRef.close();
  }
}
