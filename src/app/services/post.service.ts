import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'inspector';
import { UserResponse } from '../responses/user.response';
import { PostResponse } from '../responses/post.response';
import { PostDTO } from '../dtos/postDTO';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiPost = environment.apiBaseUrl + `/posts`;
  constructor(private http: HttpClient) { }
  getPostByActiveTrue(page: number,size: number): Observable<any> {
    const params=new HttpParams().set('page',page.toString()).set("size",size.toString());
    return this.http.get<any>(this.apiPost + `/active`,{params})
  }
  getPostByActiveFalse(page: number,size: number): Observable<any> {
    const params=new HttpParams().set('page',page.toString()).set("size",size.toString());
    return this.http.get<any>(this.apiPost + `/no-active`,{params})
  }
  getById(id: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.apiPost + `/${id}`)
  }
  getPostByMajorId(majorId: string,page: number,size: number): Observable<any> {
    const params=new HttpParams().set('page',page.toString()).set("size",size.toString());
    return this.http.get<any>(this.apiPost + `/major/${majorId}`,{params})
  }
  getPostByUserId(userId: string): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.apiPost + `/user/${userId}`)
  }
  create(postDto: Object, files: File[], images: File[]): Observable<any> {
    const formData = new FormData()
    formData.append("postDTO", JSON.stringify(postDto))
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append(`files`, file);
      });
    }
    if (images.length > 0) {
      images.forEach((image) => {
        formData.append(`images`, image);
      });
    }
    return this.http.post(this.apiPost, formData)
  }
  update(id: string, postDTO: PostDTO): Observable<any> {
    const formData = new FormData()
    formData.append("postDTO", JSON.stringify(postDTO))
    return this.http.put(this.apiPost + `/${id}`, postDTO)
  }
  delete(id: string): Observable<any> {
    return this.http.delete(this.apiPost + `/${id}`)
  }
}
