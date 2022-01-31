import { Component } from '@angular/core';
import { ImageService } from './image-service.service';
import * as cheerio from 'cheerio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Random-Screenshot';
  loading: boolean = false;
  imgLoading: boolean = false;
  errorMessage: any;
  fullHtml: string = '';
  imgSrc: string = '';
  imageToShow: any;

  constructor(private imgService: ImageService) {
    this.getImages();
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  public async getImages() {
    this.loading = true;
    this.errorMessage = '';
    this.imgService.getPageLink().subscribe(
      (response) => {
        //next() callback
        console.log('response received');

        const $ = cheerio.load(response);
        const rows = $('.screenshot-image');

        console.log('Img Link: ');
        console.log(rows[0]['attribs']['src']);

        this.imgSrc = rows[0]['attribs']['src'];

        this.imgLoading = true;
        this.imgService.getImageAsBlob(this.imgSrc).subscribe(
          (data) => {
            this.createImageFromBlob(data);
            this.imgLoading = false;
          },
          (error) => {
            this.imgLoading = true;
            console.log(error);
          }
        );

        this.loading = false;
      },
      (error) => {
        //error() callback
        console.log('ERROR');
        console.error(error);
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
}
