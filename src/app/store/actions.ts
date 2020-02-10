import {Action} from '@ngrx/store';
import {Folder} from '../services/folder';

export enum ActionTypes {
  GetItems = '[Folder] Load items from server',
  LoadSuccess = '[Folder] Load success',
  SetLink = '[Folder] Set link as array of IDs',
  AddFolder = '[Folder] Add new folder to folderList',
  UpdateFoldersList = '[Folder] update foldList',
}

// get from json
export class GetData implements Action {
  readonly type = ActionTypes.GetItems;
}

// Success load from json
export class LoadItems implements Action {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public folders: Folder[]) {
  }
}

export class SetLink implements Action {
  readonly type = ActionTypes.SetLink;

  constructor(public link: string[]) {
  }
}

// for add folder to folderList
export class AddFolder implements Action {
  readonly type = ActionTypes.AddFolder;

  constructor(public newFolder: Folder) {
  }
}

export class UpdateFoldersList implements Action {
  readonly type = ActionTypes.UpdateFoldersList;

  constructor(public folders: Folder[]) {
  }
}

export type ActionsUnion = GetData | LoadItems | SetLink | AddFolder | UpdateFoldersList ;
