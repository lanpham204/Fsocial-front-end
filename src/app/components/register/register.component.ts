import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user_group = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.pattern('[Pp][Ss]\\d{5}'),
    ]),
    email: new FormControl('', Validators.email),
    full_name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.minLength(3)),
    confirm_password: new FormControl('', Validators.minLength(3)),
  });
  constructor(private userService: UserService) {}
  register() {
    if (this.user_group.valid) {
      this.userService.register(this.user_group.value).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
}
