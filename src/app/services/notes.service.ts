// Angular core libraries
import { Injectable } from '@angular/core';

// Third-party libraries
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
  sendTimeLink = new Subject<number>();
}
