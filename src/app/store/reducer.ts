import {ActionsUnion, ActionTypes} from './actions';
import {ListState, INITIAL_STATE} from './selectors';

export function FoldersReducer(state: ListState = INITIAL_STATE, action: ActionsUnion) {
  // console.log(state);
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      return {
        ...state,
        folderList: action.folders
      };

    case ActionTypes.SetLink:
      return {
        ...state,
        link: action.link,
      };

    case ActionTypes.AddFolder:
      return {
        ...state,
        folderList: state.folderList,
        link: state.link,
        newFolder: action.newFolder
      };

    case
    ActionTypes.UpdateFoldersList:
      return {
        ...state,
        folderList: state.folderList
      };

    default:
      return state;
  }
}
