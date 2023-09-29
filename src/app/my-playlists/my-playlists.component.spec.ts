import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlaylistsComponent } from './my-playlists.component';

describe('MyPlaylistsComponent', () => {
  let component: MyPlaylistsComponent;
  let fixture: ComponentFixture<MyPlaylistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPlaylistsComponent]
    });
    fixture = TestBed.createComponent(MyPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
