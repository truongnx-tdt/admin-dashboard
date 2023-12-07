import { Component } from '@angular/core';
import { OrderManagerService } from '../order-manager.service';

@Component({
  selector: 'app-orde-page',
  templateUrl: './orde-page.component.html',
  styleUrls: ['./orde-page.component.scss']
})


export class OrdePageComponent {
  products!: any[];
  first = 0;
  rows = 10;
  constructor(private productService: OrderManagerService) { }

  ngOnInit() {
    this.productService.getOrderData().subscribe((data) => {
      this.products = data
      console.log(data)
    });


  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }


  // Trong component.ts
extractInputValue(event: Event): string {
  if (event.target instanceof HTMLInputElement) {
    console.log(event.target.value)
    return event.target.value;
  }
  return '';
}

}
