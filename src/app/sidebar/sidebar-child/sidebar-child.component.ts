import {Component, Input, OnInit} from '@angular/core';
import {Folder} from '../../services/folder';

@Component({
  selector: 'app-sidebar-child',
  templateUrl: './sidebar-child.component.html',
  styleUrls: ['./sidebar-child.component.scss']
})
export class SidebarChildComponent implements OnInit {
  @Input() folder: Folder;
  @Input() parentUrl?: string;

  public link: string;
  public childUrl: string;
  constructor() { }

  ngOnInit() {
    this.link = '/folders/' + (this.parentUrl ? this.parentUrl + '/' : '') + (this.folder ? this.folder.id : '');
    this.childUrl = (this.parentUrl ? this.parentUrl + '/' : '') + (this.folder ? this.folder.id : '');
  }
}
