import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { log } from 'console';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css',
})
export class VerificationComponent implements OnInit {
  id = '';
  code = '';
  constructor(
    private active: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.id = this.active.snapshot.params['id'];
  }
  verify(): void {
    console.log(this.code);
    
    this.userService.verifyUser(this.id, this.code).subscribe({
      next: (response: any) => {
        console.log(response);
        alert('Your account has been verified successfully!');
      },
      error: (error: any) => {
        console.log(error);
        alert('Verification failed!');
      },
    });
  }
}
