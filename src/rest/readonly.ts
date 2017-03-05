import {Injector} from '@samizdatjs/tiamat';
import {Collection, Database} from '@samizdatjs/tashmetu';
import {get, RouterProvider} from '../server';
import * as express from 'express';

export class ReadOnlyRestProvider implements RouterProvider {
  public constructor(private collection: string) {};

  public createRouter(injector: Injector): any {
    let database = injector.get<Database>('tashmetu.Database');
    return new ReadOnlyRestRouter(database, this.collection);
  }
}

class ReadOnlyRestRouter {
  public constructor(private database: Database, private collection: string) {};

  @get('/')
  private getAll(req: express.Request, res: express.Response): void {
    let collection = this.database.collection(this.collection);
    let selector = this.parseJson(req.query.selector);
    let options: any = {};
    if (req.query.limit) {
      options.limit = req.query.limit;
    }
    if (req.query.sort) {
      options.sort = this.parseJson(req.query.sort);
    }
    collection.find(selector, options, (result: any) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
  }

  @get('/:id')
  private getOne(req: express.Request, res: express.Response): void {
    let collection = this.database.collection(this.collection);
    collection.findOne({_id: req.params.id}, {}, (result: any) => {
      if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
      } else {
        res.status(500).send('No document named: ' + req.params.id);
      }
    });
  }

  private parseJson(input: any): Object {
    try {
      return JSON.parse(input);
    } catch (e) {
      return {};
    }
  }
}