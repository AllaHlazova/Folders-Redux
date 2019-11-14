import {async, TestBed} from '@angular/core/testing';
import {FoldersService} from './folders.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Folder} from './folder';
// import {BehaviorSubject} from 'rxjs';

describe('FoldersService', () => {
  beforeEach(async (() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ],
    providers: [FoldersService]
  })));
  // beforeEach(() => TestBed.configureTestingModule({
  //   imports: [
  //     HttpClientTestingModule,
  //     RouterTestingModule
  //   ]
  // }));

  it('should be created', () => {
    const service: FoldersService = TestBed.get(FoldersService);
    expect(service).toBeTruthy();
  });

  // it('should be created new folder', async (done): Folder[] => {
  it('should be created new folder', async (done) => {
    const service: FoldersService = TestBed.get(FoldersService);

    const foldList = service.foldersList;
    // const foldList = [];
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
    service.save(newFolder);
    const result = await foldList.push(newFolder);
    // expect(result).toEqual(foldList);
    expect(result).toEqual(foldList.length + 1);
    done();
  });
});
