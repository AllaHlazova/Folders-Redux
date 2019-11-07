import {Component, OnInit} from '@angular/core';
import {Folder} from '../services/folder';
import {FoldersService} from '../services/folders.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-content-folder',
  templateUrl: './content-folder.component.html',
  styleUrls: ['./content-folder.component.scss']
})
export class ContentFolderComponent implements OnInit {

  public foldersList: Folder[] = [];

  public folder: Folder;

  constructor(public foldersService: FoldersService, public router: Router) {
    this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationEnd) {
        // console.warn('11111');
        this.foldersService.subject.subscribe((folders: Folder[]) => {
          if (folders.length) {
            this.foldersList = folders;
            // console.log(folders);
            const link: string[] = event.url.replace('/folders/', '').split('/');
            this.folder = this.foldersService.findFold(link);
          }
        });
      }
    });
  }

  ngOnInit() {
  }
}

