import {Component, OnInit} from '@angular/core';
import {FoldersService} from '../services/folders.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Folder} from '../services/folder';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {

  public form: FormGroup;
  // public parentFolder: boolean;

  constructor(private folderService: FoldersService) {
  }

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl('', [Validators.minLength(3), Validators.required]),
      text: new FormControl('', [Validators.minLength(5), Validators.required]),
      img: new FormControl('', [Validators.minLength(3), Validators.required
        // Validators.pattern('(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)')
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

  public save(): void {
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
    this.folderService.save(newFolder);
  }
}
