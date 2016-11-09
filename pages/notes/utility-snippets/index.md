---
title: Utility Snippets
---

### Enable :active styles to work on mobile Safari

```js
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

if (canUseDOM) {
  // Enable :active styles to work on mobile Safari
  document.addEventListener('touchstart', () => {}, true);
}
```

### Can Use Dom

```js
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

if (canUseDOM) {
  /* do stuffs in env with dom */
}
```
