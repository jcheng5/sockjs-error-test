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
    [stack trace]
Message received: two
Uncaught Error: boom
    [stack trace]
```

## Actual behavior

JS console says:

```
Message received: one
Uncaught Error: boom
    [stack trace]
Message received: one
Uncaught Error: boom
    [stack trace]
```

(i.e. `Message received: one` appears twice)
