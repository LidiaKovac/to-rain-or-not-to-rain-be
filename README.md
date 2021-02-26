# to-rain-or-not-to-rain-be - TypeScript REST API
## General things to remember if trying to build a REST API with ExpressJS and TS: 
- Request and Response are both basic TS interfaces and express interfaces. You want to use the express one, so remember to import them. 
- NextFunction is the interface for next() and is also imported from ExpressJS. 
- Async functions return Promise<T> as type. Replace T with what your funciton returns. In case of endpoints, you will probably only send, never return, so it's of type void. 

- **req.header("Authorization").replace("Bearer ", "") - error TS2532: Object is possibly 'undefined'**
**WARNING! This will not work, see below **
```js
import { ClientRequestArgs } from 'http'; //this is a core module
const headers:ClientRequestArgs = req.headers;
const tokenAuth = headers.auth; 
const token = tokenAuth?.replace("Bearer", "")}
```
**Because the headers we send are not the same "format" http provides, tokenAuth will be undefined. Instead, do: **
```js
  const headers = req.headers
    const tokenAuth = headers.authorization
const token = await tokenAuth?.replace("Bearer", "")
```

This doesn't give me any errors back. 

- **req.user - Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>** 
  - This is due to the fact that an express Request doesn not bear the user prop. I solved this by returning the values instead of assigning them.

- **Route.get() requires a callback function but got a [object Object]** when calling the middleware
  - Changed the exports of the middleware from: 
```
module.exports = {
  authMW: authorize
};
```
To: 
```module.exports = authorize```

- 
