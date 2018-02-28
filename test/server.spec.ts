import {bootstrap, component, factory, provider} from '@ziggurat/tiamat';
import {ServerFactory} from '../src/factories/server';
import {get} from '../src/decorators';
import {Tashmetu} from '../src/index';
import * as express from 'express';
import * as request from 'supertest-as-promised';
import 'mocha';

describe('ServerFactory', () => {
  @provider()
  class TestServerFactory extends ServerFactory {
    @factory({key: 'express.Application'})
    public app(): express.Application {
      return super.app();
    }

    @get('/asyncGet')
    private async asyncGet(req: express.Request, res: express.Response): Promise<any> {
      return {};
    }

    @get('/promiseGet')
    private promiseGet(req: express.Request, res: express.Response): Promise<any> {
      return Promise.resolve({});
    }
  }

  @component({
    providers: [TestServerFactory],
    dependencies: [Tashmetu]
  })
  class TestComponent {}

  let app = bootstrap(TestComponent).get<express.Application>('express.Application');

  describe('get decorator', () => {
    it('should work with an async handler', () => {
      return request(app).get('/asyncGet').expect(200);
    });

    it('should work with promises', () => {
      return request(app).get('/promiseGet').expect(200);
    });
  });
});