import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Folder} from './folder';
import {NavigationEnd} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  public subject = new BehaviorSubject<Folder[]>([]);
  private foldersList: Folder[]; // это не тот же лист что и в контент-фолдере

  constructor(private http: HttpClient) {
  }

  public getData() {
    this.http.get('/assets/folders.json').subscribe((data: { folders: Folder[] }) => {
        this.subject.next(data.folders);
        this.foldersList = data.folders;
      }
    );
  }

  public findFold(urls: string[]): Folder {
    let findFolder;
    for (let i = 0; i < urls.length; i++) {
      for (const folder in this.foldersList) {
        if (this.foldersList[folder].id === +urls[i]) {
          findFolder = this.foldersList[folder];
          console.log(findFolder);
          return findFolder;
        }
      }
    }
    // for (let i = 0; i < urls.length; i++) {
    urls.forEach((id, ind) => {
      findFolder.subFolders.forEach((el) => {
        console.log(findFolder);

        // if (findFolder[subFolder].id === +urls[id]) {
        //   findFolder = findFolder[subFolder];
        //   console.log(subFolder);
        //   return findFolder;
        // }

        // })
        // for (const subFolder in findFolder) {

        // console.log(findFolder);
        // if (findFolder[subFolder].id === +urls[i]) {
        //     findFolder = findFolder[subFolder];
        //     console.log(subFolder);
        //     return findFolder;
        //   }
      });
    });
  }
}
