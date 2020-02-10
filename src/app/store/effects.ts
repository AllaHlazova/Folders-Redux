import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {ActionTypes, LoadItems, SetLink, UpdateFoldersList} from './actions';
import {FoldersService} from '../services/folders.service';
import {Folder} from '../services/folder';
import {select, Store} from '@ngrx/store';
import {allFoldersList, currLink, findFold, ListState} from './selectors';
import {Router} from '@angular/router';

@Injectable()

export class ListEffects {
  constructor(
    private actions$: Actions,
    private foldersService: FoldersService,
    public router: Router,
    private store: Store<{ list: ListState }>,
  ) {
  }

  @Effect()
  loadFolders$ = this.actions$.pipe(
    ofType(ActionTypes.GetItems),
    mergeMap(() =>
      this.foldersService.getData().pipe(
        map((data: { folders: Folder[] }) => {
          return new LoadItems(data.folders);
        }),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  SaveFolders$ = this.actions$.pipe(
    ofType(ActionTypes.AddFolder),
    withLatestFrom( (this.store.pipe(select((allFoldersList)))), (this.store.pipe(select(currLink)))),
    map(([action, list, link]: [any, Folder[], string[] ]) => {
      this.saveNewFolder(action.newFolder, link, list);
      return new UpdateFoldersList(list);
    })
  );
  // withLatestFrom(this.store.pipe(select((findFolder))) ),
  // map(([action, selectFold]: [any, Folder]) => {
  //   // console.log(11, selectFold);
  //   console.log('selectFold.subFolders', selectFold.subFolders);
  //   selectFold.subFolders.push(action.newFolder);
  //   // this.router.navigate(['/folders/' + '/' + selectFold.id]);
  //   return new UpdateFoldersList();
  // })


  public saveNewFolder(newFolder: Folder, link?: any, list?: Folder[]) {
    // add parent folder
    if (link == null) {
      list.push(newFolder);
      const newLink: any = this.router.navigate(['/folders/' + newFolder.id]);
      this.store.dispatch(new SetLink(newLink));
    } else {
      // add sub folder
      const currFindFolder: Folder = findFold(link, list);
      currFindFolder.subFolders.push(newFolder);
      const linkNew = link.toString();
      const routLink = linkNew.replace(',', '/');
      const url: any = this.router.navigate(['/folders/' + routLink + '/' + newFolder.id]);
      this.store.dispatch(new SetLink(url));
    }
  }
}
