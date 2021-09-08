# sockjs-error-test

Minimal repro of a SockJS issue where throwing an error during `onmessage` results in messages being repeated.

## Installation

```
npm install
```

## Running

```
node index.js
```

Then launch a browser and go to http://localhost:9999/.


## Expected behavior

JavaScript console should say:

```
Message received: one
Uncaught Error: boom
    at SockJS.sockjs.onmessage
    at SockJS.EventTarget.dispatchEvent (eventtarget.js:51)
    at main.js:282
    at Array.forEach (<anonymous>)
    at SockJS._transportMessage (main.js:280)
    at XhrStreamingTransport.EventEmitter.emit (emitter.js:50)
    at Polling.<anonymous> (sender-receiver.js:23)
    at Polling.EventEmitter.emit (emitter.js:50)
    at XhrReceiver.<anonymous> (polling.js:30)
    at XhrReceiver.EventEmitter.emit (emitter.js:50)
Message received: two
Uncaught Error: boom
    at SockJS.sockjs.onmessage ((index):11)
    at SockJS.EventTarget.dispatchEvent (eventtarget.js:51)
    at main.js:282
    at Array.forEach (<anonymous>)
    at SockJS._transportMessage (main.js:280)
    at XhrStreamingTransport.EventEmitter.emit (emitter.js:50)
    at Polling.<anonymous> (sender-receiver.js:23)
    at Polling.EventEmitter.emit (emitter.js:50)
    at XhrReceiver.<anonymous> (polling.js:30)
    at XhrReceiver.EventEmitter.emit (emitter.js:50)
```

## Actual behavior

JS console says:

```
Message received: one
Uncaught Error: boom
    at SockJS.sockjs.onmessage
    at SockJS.EventTarget.dispatchEvent (eventtarget.js:51)
    at main.js:282
    at Array.forEach (<anonymous>)
    at SockJS._transportMessage (main.js:280)
    at XhrStreamingTransport.EventEmitter.emit (emitter.js:50)
    at Polling.<anonymous> (sender-receiver.js:23)
    at Polling.EventEmitter.emit (emitter.js:50)
    at XhrReceiver.<anonymous> (polling.js:30)
    at XhrReceiver.EventEmitter.emit (emitter.js:50)
Message received: one
Uncaught Error: boom
    at SockJS.sockjs.onmessage ((index):11)
    at SockJS.EventTarget.dispatchEvent (eventtarget.js:51)
    at main.js:282
    at Array.forEach (<anonymous>)
    at SockJS._transportMessage (main.js:280)
    at XhrStreamingTransport.EventEmitter.emit (emitter.js:50)
    at Polling.<anonymous> (sender-receiver.js:23)
    at Polling.EventEmitter.emit (emitter.js:50)
    at XhrReceiver.<anonymous> (polling.js:30)
    at XhrReceiver.EventEmitter.emit (emitter.js:50)
```

(i.e. `Message received: one` appears twice)
