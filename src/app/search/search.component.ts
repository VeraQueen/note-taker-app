import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  response: any = {};
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(null, Validators.required),
    });
  }

  onSearch() {
    this.isLoading = true;
    const url = 'https://www.googleapis.com/youtube/v3/search';
    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('key', 'AIzaSyCAyu-LUc_OMFhctLj27SnFgeSUwHsKdHg')
      .set('q', this.searchForm.get('searchInput').value)
      .set('type', 'playlist');

    const options = { params: urlParams };

    console.log(this.searchForm.get('searchInput').value);

    this.http.get(url, options).subscribe((data) => {
      this.response = data;
      this.isLoading = false;
      console.log(this.response);
    });
  }
}
