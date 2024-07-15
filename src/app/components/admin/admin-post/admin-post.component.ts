import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { PostService } from '../../../services/post.service';
import { response } from 'express';
import { PostResponse } from '../../../responses/post.response';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-admin-post',
  standalone: true,
  imports: [TabViewModule, CommonModule, FormsModule,],
  templateUrl: './admin-post.component.html',
  styleUrl: './admin-post.component.css'
})
export class AdminPostComponent implements OnInit {
  postsActiveTrue: PostResponse[] = []
  postsActiveFalse: PostResponse[] = []
  constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.getPostsByActiveTrue()
    this.getPostsByActiveFalse()
  }
  getPostsByActiveTrue() {
    this.postService.getPostByActiveTrue().subscribe({
      next: (response: any) => {
        this.postsActiveTrue = response.posts
        console.log(response);
      }, error: (error: any) => {
        console.log(error);
      }

    })
  }
  getPostsByActiveFalse() {
    this.postService.getPostByActiveFalse().subscribe({
      next: (response: any) => {
        this.postsActiveFalse = response.posts
        console.log(this.postsActiveFalse);
      }, error: (error: any) => {
        debugger
        console.log(error);
      }

    })
  }
}
