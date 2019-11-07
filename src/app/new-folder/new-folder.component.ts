import {Component, OnInit} from '@angular/core';
import {FoldersService} from '../services/folders.service';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {

  public form: FormGroup;

  constructor(private folderService: FoldersService, public router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.minLength(2),
        Validators.required, Validators.pattern('~^https?://\\S+(?:jpg|jpeg|png)$~')]),
      text: new FormControl('', [Validators.minLength(3),
        Validators.required]),
      img: new FormControl('', [Validators.minLength(8), Validators.required]),
    });
    // console.log(this.form);
  }

  public showErrors(control: AbstractControl): string {
    let errorText = '';
    for (const value in control.errors) {
      switch (value) {
        case 'minlength':
          errorText = `Expected length more ${control.errors.minlength.requiredLength}`;
          break;
        case 'required':
          errorText = 'You must fill in the field';
          break;
        case 'pattern':
          errorText = `You must ....`;
          break;
      }
    }
    return errorText;
  }

  public save(): void {
    this.folderService.save();
      // ...
  }
}
