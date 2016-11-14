---
title: Script Injection
---

Utility gist to inject scripts into current context.

```js
(function(element, src) {
    element.src = src;
    element.onload = () => {
      jQuery.noConflict();
      console.log('script injected');
    };
    document.head.appendChild(element);
})(document.createElement('script'), '//code.jquery.com/jquery-latest.min.js')
```
