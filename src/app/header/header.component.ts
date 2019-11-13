import {Component, OnInit} from '@angular/core';
import {FoldersService} from '../services/folders.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private folderService: FoldersService, private  router: Router) { }

  ngOnInit() {
  }
  public func() {
    this.folderService.link = null;
    // console.log(this.folderService.link);
    this.router.navigate(['/new-folder']);
  }
}
