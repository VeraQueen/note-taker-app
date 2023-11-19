import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  fetchPlaylists(searchInputValue: string) {
    const url = 'https://www.googleapis.com/youtube/v3/search';
    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('key', 'AIzaSyCAyu-LUc_OMFhctLj27SnFgeSUwHsKdHg')
      .set('q', searchInputValue)
      .set('type', 'playlist')
      .set('maxResults', 24);
    const options = { params: urlParams };

    return this.http.get(url, options);
  }

  getPlaylist(playlistId: string) {
    const url = 'https://www.googleapis.com/youtube/v3/playlists';
    const urlParams = new HttpParams()
      .set('part', 'snippet, contentDetails')
      .set('key', 'AIzaSyCAyu-LUc_OMFhctLj27SnFgeSUwHsKdHg')
      .set('id', playlistId);
    const options = { params: urlParams };

    return this.http.get(url, options);
  }

  getVideos(playlistId: string) {
    const url = 'https://www.googleapis.com/youtube/v3/playlistItems';
    const urlParamns = new HttpParams()
      .set('part', 'snippet, status')
      .set('key', 'AIzaSyCAyu-LUc_OMFhctLj27SnFgeSUwHsKdHg')
      .set('maxResults', 12)
      .set('playlistId', playlistId);
    const options = { params: urlParamns };

    return this.http.get(url, options);
  }
}
