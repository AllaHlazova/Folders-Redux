import {Component, OnDestroy, OnInit} from '@angular/core';
import {Folder} from '../services/folder';
import {FoldersService} from '../services/folders.service';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-content-folder',
  templateUrl: './content-folder.component.html',
  styleUrls: ['./content-folder.component.scss']
})
export class ContentFolderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public foldersList: Folder[] = [];
  public folder: Folder;

  constructor(public foldersService: FoldersService, public router: Router) {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.foldersService.subject.subscribe((folders: Folder[]) => {
            if (folders.length) {
              this.foldersList = folders;
              // console.log(folders);
              // check if strings are valid or not
              if (event.url.startsWith('/folders')) {
                const link: string[] = event.url.replace('/folders/', '').split('/');
                this.folder = this.foldersService.findFold(link);
                // this.foldersService.link = link;
                this.foldersService.link = event.url;
                console.log(event.url);
                console.log(typeof event.url);
                // console.log(link);
              }
            }
          });
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

