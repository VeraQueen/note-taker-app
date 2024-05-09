import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroPlus,
  heroFolderOpen,
  heroArrowLeft,
  heroArrowUp,
  heroPencilSquare,
  heroXMark,
  heroCheck,
  heroArrowDown,
  heroBars2,
  heroPlayCircle,
} from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [],
  imports: [
    NgIconsModule.withIcons({
      heroPlus,
      heroFolderOpen,
      heroArrowLeft,
      heroArrowUp,
      heroPencilSquare,
      heroXMark,
      heroCheck,
      heroArrowDown,
      heroBars2,
      heroPlayCircle,
    }),
  ],
  exports: [NgIconsModule],
})
export class IconsModule {}
