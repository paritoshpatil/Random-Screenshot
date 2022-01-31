import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getPageLink(): Observable<any> {
    return this.http.get('https://prnt.sc/image/uf2910', {
      responseType: 'text',
    });
  }

  getImageAsBlob(imageURL: string): Observable<Blob> {
    return this.http.get(imageURL, { responseType: 'blob' });
  }
}
