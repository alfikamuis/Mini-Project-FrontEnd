import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
   password!: string;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.authState$.subscribe((authState: any) => {
      if (authState) {
        this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/profile');
      } else {
        this.router.navigateByUrl('/login');
      }
    });

  }

  // signInWithGoogle() {
  //   this.userService.googleLogin();
  // }

  login(form: NgForm) {
    const email = this.email;
    const password = this.password;

    if (form.invalid) {
      return;
    }

    form.reset();
    this.userService.loginUser(email, password);
  }

}
