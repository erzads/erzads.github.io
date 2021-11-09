import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClearSavedDataDialogComponent } from './dialogs/clear-saved-data-dialog/clear-saved-data-dialog.component';
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [AppComponent, ClearSavedDataDialogComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    ClearSavedDataDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
