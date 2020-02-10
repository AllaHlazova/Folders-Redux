import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {allFoldersList, ListState} from '../store/selectors';
import {GetData} from '../store/actions';
import {Folder} from '../services/folder';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public foldersList: Folder[] = [];

  constructor(private store: Store<{ list: ListState }>) {
    store.pipe(select(allFoldersList)).subscribe((data: Folder[]) => {
      this.foldersList = data;
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetData());
  }
}
