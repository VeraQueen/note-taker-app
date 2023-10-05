import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  isLoading = false;
  playlists: any = {};

  constructor(
    private http: HttpClient,
    private playlistService: PlaylistService
  ) {}

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
      .set('type', 'playlist')
      .set('maxResults', 24);

    const options = { params: urlParams };

    this.http.get(url, options).subscribe((data) => {
      this.playlists = data;
      this.isLoading = false;
      console.log(this.playlists);
    });
  }

  onAdd(id: number) {
    console.log('button id', this.playlists.items[id].id.playlistId);
    this.playlistService.playlistIdEmitter.next(
      this.playlists.items[id].id.playlistId
    );
  }
}
