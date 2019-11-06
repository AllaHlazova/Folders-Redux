import {Component, OnInit} from '@angular/core';
import {Folder} from '../services/folder';
import {FoldersService} from '../services/folders.service';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-content-folder',
  templateUrl: './content-folder.component.html',
  styleUrls: ['./content-folder.component.scss']
})
export class ContentFolderComponent implements OnInit {

  public foldersList: Folder[] = [];

  public folder: Folder;

  public subFolder: Folder;
  // public subscription: Subscription;

  constructor(public foldersService: FoldersService, public router: Router) {
    this.router.events.subscribe((event: any) => {

      // console.warn('11111');
      // this.foldersService.getData().subscribe((data: { folders: Folder[] }) => {
      //   this.foldersList = data.folders;

      this.foldersService.subject.subscribe(( folders: Folder[] ) => {
        this.foldersList = folders;
        // console.log(folders);
        const link: string[] = event.url.replace('/folders/', '').split('/');
        this.folder = this.foldersService.findFold(link);
      });

      // this.foldersService.get().subscribe((data) => {
      //   this.foldersList = data.folders;

        // const array: string[] = this.router.url.replace('/folders/', '').split('/');
      });
    // });
  }

ngOnInit() {}
}

