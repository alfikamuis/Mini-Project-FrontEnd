import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myUser: any;


  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    // this.userService.userData$
    //   .pipe(
    //     map(user => {
    //       if (user instanceof SocialUser) {
    //         return {
    //           ...user,
    //           email: 'test@test.com',

    //         };
    //       } else {
    //         return user;
    //       }
    //     })
    //   )
    //   .subscribe((data: ResponseModel | SocialUser) => {
    //     this.myUser = data;
    //   });
  }

  logout() {
    this.userService.logout();
  }

}
