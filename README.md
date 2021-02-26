# to-rain-or-not-to-rain-be - TypeScript REST API

When building this app I faced many issues: this is what issues they were and how I solved them: 

- **req.header("Authorization").replace("Bearer ", "") - error TS2532: Object is possibly 'undefined'**
```js
import { ClientRequestArgs } from 'http'; //this is a core module
const headers:ClientRequestArgs = req.headers;
const tokenAuth = headers.auth; 
const token = tokenAuth?.replace("Bearer", "")}
```

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
