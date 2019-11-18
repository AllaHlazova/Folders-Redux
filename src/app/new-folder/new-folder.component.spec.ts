import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NewFolderComponent} from './new-folder.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app.routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ContentFolderComponent} from '../content-folder/content-folder.component';

describe('NewFolderComponent', () => {
  let component: NewFolderComponent;
  let fixture: ComponentFixture<NewFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule
      ],
      declarations: [
        NewFolderComponent,
        ContentFolderComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
