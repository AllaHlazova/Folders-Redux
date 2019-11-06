export interface Folder {
  nameFolder: string;
  id: number;
  favorite: boolean;
  contentFolder: {
    title: string;
    text: string;
    image: string;
  };
  subFolders: Folder[];
}
