import {classDecorator, propertyDecorator, TaggedClassAnnotation} from '@ziggurat/tiamat';
import {RouterConfig, MiddlewareProvider} from './interfaces';
import {RouterMethodDecorator} from './method';
import {RouterMeta} from './meta';
import * as express from 'express';

export const router = classDecorator<RouterConfig>(
  new TaggedClassAnnotation('tashmetu:router', ['tashmetu.Router']), {
    middleware: []
  });

export const get = propertyDecorator<string>(
  new RouterMethodDecorator('get'));

export const post = propertyDecorator<string>(
  new RouterMethodDecorator('post'));

export const put = propertyDecorator<string>(
  new RouterMethodDecorator('put'));

export const patch = propertyDecorator<string>(
  new RouterMethodDecorator('patch'));

export const del = propertyDecorator<string>(
  new RouterMethodDecorator('delete'));

export const use = (handler: express.RequestHandler) => {
  return (target: any, key: string) => {
    RouterMeta.get(target.constructor).addMiddleware(injector => handler, key);
  };
};

export const useProvider = (provider: MiddlewareProvider) => {
  return (target: any, key: string) => {
    RouterMeta.get(target.constructor).addMiddleware(provider, key);
  };
};
