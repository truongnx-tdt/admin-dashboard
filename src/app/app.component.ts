import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin-system';
  /**
   *
   */
  constructor(private auth: AuthService) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isUserOnl()
  }
  // user Onl
  isUserOnl() {
    // Thiết lập hàm định thời để gọi lại sau mỗi 5 phút
    if (this.auth.isUserLoggedIn()) {
      this.auth.isUserOnl().subscribe(response => {
        console.log('user-onl');
      }, error => {
        sessionStorage.removeItem('token');
        window.location.reload();
      });
      setInterval(() => {
        if (this.auth.isUserLoggedIn()) {
          this.auth.isUserOnl().subscribe(response => {
            console.log('user-onl');
          }, error => {
            sessionStorage.removeItem('token');
            window.location.reload();
          });
        }
      }, 5 * 60 * 1000);
    }
  }
}
