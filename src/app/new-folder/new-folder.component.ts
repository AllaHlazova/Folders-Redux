import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Folder} from '../services/folder';
import {Store} from '@ngrx/store';
import {ListState} from '../store/selectors';
import {AddFolder} from '../store/actions';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {

  public form: FormGroup;

  constructor(private store: Store<{ list: ListState }>) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.minLength(3), Validators.required]),
      text: new FormControl('', [Validators.minLength(5), Validators.required]),
      img: new FormControl('', [Validators.minLength(3), Validators.required,
        Validators.pattern('(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)')
      ])
    });
  }

  public showErrors(control: AbstractControl): string {
    let errorText = '';
    for (const value in control.errors) {
      switch (value) {
        case 'minlength':
          errorText = `Expected length more characters`;
          break;
        case 'required':
          errorText = 'You must fill in the field';
          break;
        case 'pattern':
          errorText = `You must write link`;
          break;
      }
    }
    return errorText;
  }

  public saveFolder(): void {
    const newId = Math.floor((Math.random() * 1000) + 1);
    const newFolder: Folder = {
      nameFolder: 'Folder' + newId,
      id: newId,
      favorite: false,
      contentFolder: {
        title: this.form.value.title,
        text: this.form.value.text,
        image: this.form.value.img
      },
      subFolders: []
    };
    this.store.dispatch(new AddFolder(newFolder));
  }
}
