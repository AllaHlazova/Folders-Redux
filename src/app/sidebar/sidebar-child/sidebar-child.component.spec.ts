import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SidebarChildComponent} from './sidebar-child.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

describe('SidebarChildComponent', () => {
  let component: SidebarChildComponent;
  let fixture: ComponentFixture<SidebarChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [SidebarChildComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
