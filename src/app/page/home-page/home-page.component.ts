import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  search: any = '';
  pages: any;
  currentPage: any;
  totalPage: any;
  total: any;
  loading: any = false;
  data: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.currentPage = 1;
    this.totalPage = 1;
    this.createPages()
    this.onSearch(this.currentPage);
  }


  createPages() {
    this.pages = Array.from(Array(this.totalPage - 1).keys()).map(d => d + 1);
    console.log(this.pages)
  }


  get pageList(): any {
    const m = this.currentPage % 5;
    if (m == 0) {
      return this.pages.slice(this.currentPage - 1, this.currentPage + 1);
    }
    return this.pages.slice(this.currentPage - 1, this.currentPage + 1);
  }

  onPaginate(page) {
    if (page <= 0) {
      this.currentPage = this.totalPage;
    } else if (page > this.totalPage) {
      this.currentPage = 1;
    } else {
      this.currentPage = page;
    }

    this.onSearch(this.currentPage);
  }


  onKey(text) {
    this.search += text;
  }

  onSearch(page) {
    console.log(this.search);
    let params: HttpParams = new HttpParams();
    params = params.set("k", this.search).set("page", page);
    this.loading = true;
    this.http.get("http://191.235.93.52:8080/reservation", { params: params }).subscribe((d: any) => {
      this.loading = false;
      this.currentPage = d.currentPage;
      this.totalPage = d.totalPage;
      this.total = d.total;
      this.data = d.data;
      this.createPages()
    }, () => {
      this.loading = false;
    })
  }

}
