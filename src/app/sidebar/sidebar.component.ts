import {Component, OnInit} from '@angular/core';
import {Folder} from '../services/folder';
import {FoldersService} from '../services/folders.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public foldersList: Folder[] = [];

  constructor(public foldersService: FoldersService) {
  }
  ngOnInit() {
  // public getData() {
  //     this.http.get('/assets/folders.json').subscribe((data: { folders: Folder[] }) =>
  //       this.subject.next(data.folders));
  //   }
    this.foldersService.subject.subscribe(( folders: Folder[] ) => {
      this.foldersList = folders;
      // console.log(folders);
    });
    this.foldersService.getData();
  }

  // public open(): void {
  //   this.router.navigate(['/ContentFolderComponent']);
  // }
}
