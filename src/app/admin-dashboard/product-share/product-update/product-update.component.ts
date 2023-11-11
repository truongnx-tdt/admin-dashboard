import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
