import {TestBed} from '@angular/core/testing';
import {FoldersService} from './folders.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Folder} from './folder';

describe('FoldersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: FoldersService = TestBed.get(FoldersService);
    expect(service).toBeTruthy();
  });

  it('should be created new folder', async (done) => {
    const service: FoldersService = TestBed.get(FoldersService);
    const foldList = service.foldersList.length;
    const newId = 999;
    const newFolder: Folder = {
      nameFolder: 'Folder' + newId,
      id: newId,
      favorite: false,
      contentFolder: {
        title: 'test',
        text: 'test',
        image: 'test'
      },
      subFolders: []
    };
    await service.save(newFolder);
    const result = service.foldersList.length;
    expect(result - foldList).toEqual(1);
    done();
  });

  it('should be created new subFolder', async (done) => {
    const service: FoldersService = TestBed.get(FoldersService);
    const newId = 888;
    const newFolder: Folder = {
      nameFolder: 'Folder' + newId,
      id: newId,
      favorite: false,
      contentFolder: {
        title: 'test',
        text: 'test',
        image: 'test'
      },
      subFolders: []
    };
    await service.save(newFolder);

    function findF(folders): Folder {
      let findFolder;
      folders.forEach((sub) => {
        if (sub.id === newId) {
          findFolder = sub;
          return findFolder;
        } else {
          findFolder = findF(sub.subFolders);
          if (findFolder) {
            return findFolder;
          }
        }
      });
      if (findFolder) {
        return findFolder;
      }
      return null;
    }

    expect(findF(service.foldersList)).toEqual(newFolder);
    done();
  });
});
