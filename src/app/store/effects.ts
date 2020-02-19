import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {ActionTypes, AddFolder, LoadItems, SetLink, UpdateFoldersList} from './actions';
import {FoldersService} from '../services/folders.service';
import {Folder} from '../services/folder';
import {select, Store} from '@ngrx/store';
import {allFoldersList, currLink, findFold, ListState} from './selectors';
import {Router} from '@angular/router';

@Injectable()

export class ListEffects {

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
    withLatestFrom((this.store.pipe(select((allFoldersList)))), (this.store.pipe(select(currLink)))),
    map(([action, list, link]: [AddFolder, Folder[], string[]]) => {
      this.saveNewFolder(action.newFolder, link, list);
      return new UpdateFoldersList(list);
    })
  );

  constructor(
    private actions$: Actions,
    private foldersService: FoldersService,
    public router: Router,
    private store: Store<{ list: ListState }>,
  ) {
  }

  public saveNewFolder(newFolder: Folder, link?: string[], list?: Folder[]) {
    // add parent folder
    if (!link) {
      list.push(newFolder);
      this.router.navigate(['/folders/' + newFolder.id]);
    } else {
      // add sub folder
      const currFindFolder: Folder = findFold(link, list);
      currFindFolder.subFolders.push(newFolder);
      link.push(newFolder.id.toString());
      this.store.dispatch(new SetLink(link));
      this.router.navigate(['folders', ...link]);
    }
  }
}
