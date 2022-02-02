import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  alphabet: string = 'abcdefghijklmnopqrstuvwxyz';

  constructor(private http: HttpClient) {}

  getPageLink(): Observable<any> {
    var url: string =
      'https://prnt.sc/image/' +
      this.alphabet.charAt(Math.floor(Math.random() * 25)) +
      this.alphabet.charAt(Math.floor(Math.random() * 25)) +
      Math.floor(1000 + Math.random() * 9000);

    console.log('URL: ' + url);

    return this.http.get(url, {
      responseType: 'text',
    });
  }

  getImageAsBlob(imageURL: string): Observable<Blob> {
    return this.http.get(imageURL, { responseType: 'blob' });
  }
}
