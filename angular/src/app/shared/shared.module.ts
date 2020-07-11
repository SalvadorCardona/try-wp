import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopMenuComponent} from "@app/shared/components/top-menu/top-menu.component";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { AssetPipe } from './pipe/asset.pipe';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [TopMenuComponent, TopHeaderComponent, AssetPipe, FooterComponent],
  exports: [
    TopMenuComponent,
    TranslateModule,
    TopHeaderComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
