import { Component } from '@angular/core';
import { Product } from '../product';
import { OrderManagerService } from '../order-manager.service';

@Component({
  selector: 'app-orde-page',
  templateUrl: './orde-page.component.html',
  styleUrls: ['./orde-page.component.scss']
})
export class OrdePageComponent {
  products!: Product[];

  constructor(private productService: OrderManagerService) { }

  ngOnInit() {
    this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'DELIVERED':
        return 'success';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'info';
    }
  }
}
