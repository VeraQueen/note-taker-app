import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface FetchPlaylistsData {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: object;
  items: [];
}

export interface FetchVideosData {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: object;
  items: [];
}

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  fetchPlaylists(searchInputValue: string, pageToken: string = '') {
    const url = 'https://www.googleapis.com/youtube/v3/search';
    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('key', 'AIzaSyCAyu-LUc_OMFhctLj27SnFgeSUwHsKdHg')
      .set('q', searchInputValue)
      .set('type', 'playlist')
      .set('maxResults', 24)
      .set('pageToken', pageToken);

    const options = { params: urlParams };

    return this.http.get<FetchPlaylistsData>(url, options);
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

  getVideos(playlistId: string, pageToken: string = '') {
    const url = 'https://www.googleapis.com/youtube/v3/playlistItems';
    const urlParamns = new HttpParams()
      .set('part', 'snippet, status')
      .set('key', 'AIzaSyCAyu-LUc_OMFhctLj27SnFgeSUwHsKdHg')
      .set('maxResults', 8)
      .set('playlistId', playlistId)
      .set('pageToken', pageToken);
    const options = { params: urlParamns };

    return this.http.get<FetchVideosData>(url, options);
  }
}
