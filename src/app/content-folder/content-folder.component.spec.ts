import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentFolderComponent } from './content-folder.component';

describe('ContentFolderComponent', () => {
  let component: ContentFolderComponent;
  let fixture: ComponentFixture<ContentFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
