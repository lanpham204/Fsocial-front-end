import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { PostService } from '../../../services/post.service';
import { response } from 'express';
import { PostResponse } from '../../../responses/post.response';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-admin-post',
  standalone: true,
  imports: [TabViewModule, CommonModule, FormsModule, ConfirmDialogModule, ToastModule, DialogModule, PaginatorModule],
  templateUrl: './admin-post.component.html',
  styleUrl: './admin-post.component.css'
})

export class AdminPostComponent implements OnInit {
  postsActiveTrue: PostResponse[] = []
  postsActiveFalse: PostResponse[] = []
  visiblePostNoActive: boolean = false;
  post?: PostResponse
  first: number = 0
  index: number = 0
  totalPagesNoActive: number = 0;
  currentPageNoActive: number = 0;
  pageSizeNoActive: number = 10;
  visiblePageNoActive: number[] = [];
  constructor(private postService: PostService,
    private confirmationService: ConfirmationService, private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.getPostsByActiveTrue()
    this.getPostsByActiveFalse()
  }
  getPostsByActiveTrue() {
    this.postService.getPostByActiveTrue(this.currentPageNoActive, this.pageSizeNoActive).subscribe({
      next: (response: any) => {
        this.postsActiveTrue = response.posts
        console.log(response);
      }, error: (error: any) => {
        console.log(error);
      }

    })
  }
  getPostsByActiveFalse() {
    this.postService.getPostByActiveFalse(this.currentPageNoActive, this.pageSizeNoActive).subscribe({
      next: (response: any) => {
        this.postsActiveFalse = response.posts
        this.totalPagesNoActive = response.totalPage
        if (this.currentPageNoActive <= this.totalPagesNoActive - 2) {
          this.getVisiblePage();
        }
      }, error: (error: any) => {
        debugger
        console.log(error);
      }
    })
  }
  onPageChangeNoActive(page: number) {
    this.currentPageNoActive = page;
    this.getPostsByActiveFalse()
  }
  onPageChange(event: any) {
    this.first = event.first
    this.currentPageNoActive = event.first
    this.getPostsByActiveFalse()
    this.totalPagesNoActive = event.rows;
    console.log(this.postsActiveFalse);
  }
  getVisiblePage(): void {
    const totalPagesToShow = 5; // Số trang hiển thị tối đa trên thanh phân trang
    const visiblePageCount = Math.min(totalPagesToShow, this.totalPagesNoActive); // Số trang hiển thị thực sự
    const startPage = Math.max(0, this.currentPageNoActive - Math.floor(visiblePageCount / 2)); // Trang bắt đầu hiển thị
    this.visiblePageNoActive = Array.from({ length: visiblePageCount }, (_, index) => startPage + index);
    console.log(this.visiblePageNoActive);

  }
  onNextPageNoActive() {
    if (this.currentPageNoActive < this.totalPagesNoActive - 1) {
      this.onPageChangeNoActive(this.currentPageNoActive + 1);
    }
  }

  onPreviousPageNoActive() {
    if (this.currentPageNoActive > 0) {
      this.onPageChangeNoActive(this.currentPageNoActive - 1);
    }
  }

  onFirstPageNoActive() {
    this.onPageChangeNoActive(0);
  }

  onLastPageNoActive() {
    this.onPageChangeNoActive(this.totalPagesNoActive - 1);
  }
  delete(event: Event, id: string, index: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Bạn có chắc muốn xóa post này',
      header: 'Xóa Post',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "btn btn-danger m-2",
      rejectButtonStyleClass: "btn btn-info m-2",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.postService.delete(id).subscribe({
          next: (response: any) => {
            this.postsActiveFalse.splice(index, 1)
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa bài thành công' });
          }, error: (error: any) => {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Xóa bài thất bại ' + error });
          }
        })
      },
      reject: () => {
      }
    });
  }
  showPost(id: string, index: number) {
    this.visiblePostNoActive = true;
    this.postService.getById(id).subscribe({
      next: (response: PostResponse) => {
        this.post = response
        this.index = index
      }, error: (error: any) => {
        console.log(error);
      }
    })
  }
  acceptPost() {
    const postDTO = {
      content: this.post?.content!,
      userId: this.post?.userId!,
      majorId: this.post?.majorId!,
      isActive: true
    }
    this.postService.update(this.post?.id!, postDTO).subscribe({
      next: (response: any) => {
        this.postsActiveFalse.splice(this.index, 1)
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Duyệt bài thành công' });
        this.visiblePostNoActive = false
      }, error: (error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Duyệt bài thất bại ' + error });
      }
    })
  }
}
