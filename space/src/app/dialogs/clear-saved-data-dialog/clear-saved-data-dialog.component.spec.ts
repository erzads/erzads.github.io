import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearSavedDataDialogComponent } from './clear-saved-data-dialog.component';

describe('ClearSavedDataDialogComponent', () => {
  let component: ClearSavedDataDialogComponent;
  let fixture: ComponentFixture<ClearSavedDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearSavedDataDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearSavedDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
