import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklayoutComponent } from './backlayout.component';

describe('BacklayoutComponent', () => {
  let component: BacklayoutComponent;
  let fixture: ComponentFixture<BacklayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
