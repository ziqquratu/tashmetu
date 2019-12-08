import {RequestHandler} from 'express';
import {classDecorator, propertyDecorator} from '@ziggurat/tiamat';
import {RouteMap, RequestHandlerFactory} from '../interfaces';
import {RouterMethodAnnotation} from './method';
import {MiddlewareAnnotation} from './middleware';

/**
 * Router-level middleware.
 *
 * This decorator can be used to attach middleware to a router by decorating its class.
 *
 * @usageNotes
 *
 * The decorator accepts a map of middleware.
 *
 * The following example shows how to mount a middleware for serving static files.
 *
 * ```typescript
 * @middleware({
 *   '/static': express.static('public')
 * })
 * ```
 */
export const middleware = <(config: RouteMap) => any>
  classDecorator(MiddlewareAnnotation, {});

const method = <(name: string, path: string, mw: (RequestHandler | RequestHandlerFactory)[]) => any>
  propertyDecorator(RouterMethodAnnotation);

/** HTTP GET request handler. */
export const get = (path: string, ...mw: (RequestHandler | RequestHandlerFactory)[]) =>
  method('get', path, mw);

/** HTTP POST request handler. */
export const post = (path: string, ...mw: (RequestHandler | RequestHandlerFactory)[]) =>
  method('post', path, mw);

/** HTTP PUT request handler. */
export const put = (path: string, ...mw: (RequestHandler | RequestHandlerFactory)[]) =>
  method('put', path, mw);

/** HTTP PATCH request handler. */
export const patch = (path: string, ...mw: (RequestHandler | RequestHandlerFactory)[]) =>
  method('patch', path, mw);

/** HTTP DELETE request handler. */
export const del = (path: string, ...mw: (RequestHandler | RequestHandlerFactory)[]) =>
  method('delete', path, mw);
