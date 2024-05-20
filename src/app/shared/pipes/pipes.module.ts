// Angular core libraries
import { NgModule } from '@angular/core';

// Application-specific imports
import { AmpersandPipe } from './ampersand.pipe';
import { ApostrophePipe } from './apostophe.pipe';

@NgModule({
  imports: [ApostrophePipe, AmpersandPipe],
  exports: [ApostrophePipe, AmpersandPipe],
})
export class PipesModule {}
