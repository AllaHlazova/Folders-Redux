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
  public nav() {
    this.folderService.link = null;
    this.router.navigate(['/new-folder']);
  }
}
