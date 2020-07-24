import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopMenuComponent} from "@app/shared/components/top-menu/top-menu.component";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import { TopHeaderComponent } from './components/top-header/top-header.component';
import {AssetPipe} from "@app/shared/pipes/asset.pipe";
import { FooterComponent } from './components/footer/footer.component';
import { MenuListComponent } from './components/top-menu/menu-list/menu-list.component';


@NgModule({
  declarations: [TopMenuComponent, TopHeaderComponent, AssetPipe, FooterComponent, MenuListComponent],
  exports: [
    TopMenuComponent,
    TranslateModule,
    TopHeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
