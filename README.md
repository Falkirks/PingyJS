PingyJS
=======
PingyJS is a **tiny** library for pinging websites in JavaScript.

### Example
```javascript
pingy.ping("http://google.com", function(success){
    if(success){
        alert("Google.com is UP!");
    }
    else{
        alert("Google.com is DOWN!);
    }
});
```
### Timeouts
To support Firefox, Pingy has to timeout requests itself. This only affects browsers that don't fire `onerror` for \<script> not found errors. This timeout can cause requests to get mixed up when firing requests in quick succession. You can check if Pingy is using timeouts using
```javascript
pingy.usesTimeout();
```
**Note:** Even if a browser supports `onerror` for \<script> not found errors, `usesTimeout()` will return `true` until Pingy can complete a test.

### Caveats 
* Can't ping things in parallel, it handles the queuing though, so that's a plus.
* Signals can get crossed if your website is written in an icky fashion.
* Can't ping using .js files as Pingy depends on a JSONP style hack. 
