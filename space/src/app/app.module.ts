import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { ClearSavedDataDialogComponent } from './dialogs/clear-saved-data-dialog/clear-saved-data-dialog.component';

@NgModule({
  declarations: [AppComponent, ClearSavedDataDialogComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  entryComponents: [
    ClearSavedDataDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
