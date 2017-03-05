import {Injector} from '@samizdatjs/tiamat';
import {Serializer} from '@samizdatjs/tashmetu';

export interface FileSystem {
  readdir(path: string): string[];
  read(path: string): any;
  write(data: string, path: string): void;

  on(event: 'file-added', fn: (path: string) => void): FileSystem;
  on(event: 'file-changed', fn: (path: string) => void): FileSystem;
  on(event: 'file-removed', fn: (path: string) => void): FileSystem;
  on(event: 'file-stored', fn: (data: string, path: string) => void): FileSystem;
  on(event: 'ready', fn: () => void): FileSystem;
}


export interface FileSystemCollectionConfig {
  /**
   * The unique identifier that the class provides an implmentation for.
   */
  providerFor: string;

  /**
   * Path to file/directory.
   */
  path: string;

  /**
   * A serializer provider creating a serializer that will parse and serialize
   * documents when reading from and writing to the file system.
   */
  serializer: (injector: Injector) => Serializer;
}

export interface DirectoryConfig extends FileSystemCollectionConfig {
  /**
   * file extension of files in the directory.
   */
  extension: string;
}


export interface FileConfig extends FileSystemCollectionConfig {}

export interface FSStorageAdapter {
  update(path: string): void;
}
