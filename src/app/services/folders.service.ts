import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Folder} from './folder';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  public subject = new BehaviorSubject<Folder[]>([]);
  private foldersList: Folder[];

  constructor(private http: HttpClient) {
  }

  public getData() {
    this.http.get('/assets/folders.json').subscribe((data: { folders: Folder[] }) => {
        this.foldersList = data.folders; // сначала присвоение, потом некст+проверка есть ли фолдерсы(в комопоненте контент)
        this.subject.next(data.folders);
      }
    );
  }

  public findFold(urls: string[]): Folder {
    let findFolder;
    for (let i = 0; i < urls.length; i++) {
      for (const folder in this.foldersList) {
        if (this.foldersList[folder].id === +urls[i]) {
          findFolder = this.foldersList[+folder];
          // console.log(findFolder);
          // return findFolder;
        }
      }

      // urls.forEach((url) => {
      //   findFolder.subFolders.forEach((subFolder) => {
      //     // console.log(findFolder);
      //     // console.log(subFolder);
      //     if (subFolder.id == url) {
      //       console.log(subFolder.id);
      //       findFolder = subFolder  ;
      //
      //       console.log(subFolder);
      //     }
      //   });
      // })

      for (let j = 1; j < urls.length; j++) {
        // urls.forEach((id) => {
        findFolder.subFolders.forEach((subFolder) => {
          if (subFolder.id == urls[+j]) {
            findFolder = subFolder;
          }
        });
      }
      if (findFolder) {
        return findFolder;
      }
    }
  }

  public addFolder(url: string[], folder: Folder, isParrent?: boolean) {
  this.findFold(url);
  }
  public save(){

  }
}
