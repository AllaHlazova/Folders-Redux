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

  // public getData(folders) {
  //   this.subject.next(this.http.get('/assets/folders.json') as Observable<{ folders: Folder[] }>);
  //   console.log(folders)
  // }

  public getData() {
    this.http.get('/assets/folders.json').subscribe((data: { folders: Folder[] }) => {
        this.subject.next(data.folders);
        this.foldersList = data.folders;
      }
    );
  }

  // public getData(): Observable<{ folders: Folder[] }> {
  //   return this.http.get('/assets/folders.json') as Observable<{ folders: Folder[] }>;
  //   // const subject = new Subject();
  // }
  // public get() {
  //   return this.getData();
  // }

  public findFold(urls: string[]): Folder {
    for (let i = 0; i < urls.length; i++) {
      for (const folder in this.foldersList) {
        if (this.foldersList[folder].id === +urls[i]) {
          const findFolder = this.foldersList[folder];
          console.log(findFolder);
          return findFolder;

          // urls.forEach(item, index){

          // }
        }
      }
    }
  }

}
