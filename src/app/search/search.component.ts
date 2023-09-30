import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl(null, Validators.required),
    });
  }

  onSearch() {
    console.log(this.searchForm.value);
  }
}
