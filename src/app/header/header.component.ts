import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import { ListState} from '../store/selectors';
import {SetLink} from '../store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<{ list: ListState }>, private  router: Router) {
  }

  ngOnInit() {
  }

  public addParentFolder() {
    const link = null;
    this.store.dispatch(new SetLink(link));
    this.router.navigate(['/new-folder']);
  }
}
