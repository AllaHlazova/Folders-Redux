import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ContentFolderComponent} from './content-folder/content-folder.component';
import {NewFolderComponent} from './new-folder/new-folder.component';

const ROUTERS: Route[] = [
  // {
  //   path: '',
  //   redirectTo: 'folders',
  //   pathMatch: 'full',
  // },
  // { path: 'folders',
  //   component: ContentFolderComponent
  // },
  {
    path: 'new-folder',
    component: NewFolderComponent
  },
  {
    path: 'folders',
    children: [
      {
        path: '**',
        component: ContentFolderComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTERS)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
