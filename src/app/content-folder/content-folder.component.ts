import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {Folder} from '../services/folder';
import {Observable, Subject} from 'rxjs';
import {currentFolder, ListState} from '../store/selectors';
import {SetLink} from '../store/actions';

@Component({
  selector: 'app-content-folder',
  templateUrl: './content-folder.component.html',
  styleUrls: ['./content-folder.component.scss']
})
export class ContentFolderComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public folder$: Observable<Folder>;

  constructor(private router: Router, private store: Store<{ list: ListState }>) {
    this.folder$ = this.store.pipe(select(currentFolder));
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          if (event.url.startsWith('/folders')) {
            const link: string[] = event.url.replace('/folders/', '').split('/');
            this.store.dispatch(new SetLink(link));
          }
        }
      });
  }

  ngOnInit(): void {
  }
}
