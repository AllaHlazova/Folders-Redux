import {createSelector} from '@ngrx/store';
import {Folder} from '../services/folder';


export interface ListState {
  folderList: Folder[];
  link: string[];
}

export const INITIAL_STATE: ListState = {
  folderList: [],
  link: null,
};

export const selectorAllList = (state: { list: ListState }): ListState => state.list;
export const allFoldersList = createSelector(
  selectorAllList,
  (state: ListState): Folder[] => state.folderList
);

export const actionLink = (state: { list: ListState }): ListState => state.list;
export const currLink = createSelector(
  actionLink,
  (state: ListState): string[] => state.link
);

export const actionFindFolder = (state: { list: ListState }): ListState => state.list;
export const currentFolder = createSelector(
  actionFindFolder,
  (state: ListState): Folder => findFold(state.link, state.folderList)
);

export function findFold(urls: string[], folderList?: Folder[]): Folder {
  let currFindFolder;
  if (urls) {
    for (let i = 0; i < urls.length; i++) {
      for (const folder in folderList) {
        if (folderList[folder].id === +urls[i]) {
          currFindFolder = folderList[+folder];
        }
      }
      for (let j = 1; j < urls.length; j++) {
        currFindFolder.subFolders.forEach((subFolder) => {
          if (subFolder.id === +urls[+j]) {
            currFindFolder = subFolder;
          }
        });
      }
      if (currFindFolder) {
        return currFindFolder;
      }
    }
  }
}
