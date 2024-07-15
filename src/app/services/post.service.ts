import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'inspector';
import { UserResponse } from '../responses/user.response';
import { PostResponse } from '../responses/post.response';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiPost = environment.apiBaseUrl+`/posts`;
  constructor(private http: HttpClient) { }
  getPostByActiveTrue(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.apiPost+`/active`)
  }
  getPostByActiveFalse(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.apiPost+`/no-active`)
  }
  getById(id: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.apiPost+`/${id}`)
  }
  getPostByMajorId(majorId: string): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.apiPost+`/major/${majorId}`)
  }
  getPostByUserId(userId: string): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.apiPost+`/user/${userId}`)
  }
  create(postDto: Object,files: File[],images: File[]): Observable<any> {
    const formData = new FormData()
    formData.append("postDTO",JSON.stringify(postDto))
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    images.forEach((image) => {
      formData.append(`images`, image);
    });
    return this.http.post(this.apiPost,formData)
  }
  update(postDto: Object,files: File[],images: File[]): Observable<any> {
    const formData = new FormData()
    formData.append("postDTO",JSON.stringify(postDto))
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    images.forEach((image) => {
      formData.append(`images`, image);
    });
    return this.http.put(this.apiPost,formData)
  }
  delete(id: string): Observable<any> {
    return this.http.delete(this.apiPost+`/${id}`)
  }
}
