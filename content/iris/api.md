+++
date = "2017-03-06T15:18:23-05:00"
title = "Iris | API Docs"
+++

#### Iris API documentation for Go and Node.js
---
## Creating a Client
Iris uses gRPC behind the scenes for communication between the API and the service. When doing any transaction between the API and the service we recommend creating a context with a timeout.  We recommend always adding a timeout to your context and only reusing a context for requests that make sense.  The timeout amount should be the max amount of time you think it should take for the service to respond to your request, typically this is very quick.  Remember to close your client when you are finished using it.

{{< codetoggle >}}

{{< codecontent >}}

```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

testClient, err := NewClient(ctx, "127.0.0.1:32000", nil)
if err != nil {
    //handle connection error
    return
}
defer testClient.Close()

//use the client
```
{{< /codecontent >}}

{{< codecontent >}}
```javascript
const iris_client = require('iris');

var client = new iris_client('127.0.0.1:32000');
client.connect().then((response) => {
    //use the client
    client.close();
}).catch((error) => {
    //handle connection error
    client.close();
});
```
{{< /codecontent >}}

{{< /codetoggle >}}

## Setting values for a source and key
Iris makes it easy to set and retrieve a value for a given source and key once you have a client instance. When getting or setting values with the Iris API the data needs to be encoded into a sequence of bytes.  If this is a custom struct or object type then you will need to create your own encoding and decoding method.

{{< codetoggle >}}

{{< codecontent >}}

```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

var encoded = []byte("value")
if err := testClient.SetValue(ctx, "source", "key", encoded); err != nil {
    //handle set value error
    return
}
```
{{< /codecontent >}}

{{< codecontent >}}

```javascript
client.connect().then((response) => {
    var encoded = Buffer.from("value").toString('base64');
    return client.setValue('source', 'key', encoded);
}).then((response) => {
    client.close();
}).catch((error) => {
    //handle set value error
    client.close();
});
```
{{< /codecontent >}}
{{< /codetoggle >}}

## Getting values for a source and key
Similar to setting values for a source, retrieval is easy.  Remember to decode the returned value if you encoded it when setting the value.

{{< codetoggle >}}
{{< codecontent >}}

```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

value, err := testClient.GetValue(ctx, "source", "key")
if err != nil {
    //handle error getting values
    return
}

// decode value if necessary
decoded := string(value);
```
{{< /codecontent >}}

{{< codecontent >}}

```javascript
client.connect().then((response) => {
    return client.getValue('source', 'key');
}).then((response) => {
    // decode value if necessary
    var decoded = Buffer.from(response.value, 'base64').toString();
    client.close();
}).catch((error) => {
    //handle error getting values
    client.close();
});
```
{{< /codecontent >}}
{{< /codetoggle >}}

## Getting all known sources
You can use the following code to find all sources known to Iris.

{{< codetoggle >}}
{{< codecontent >}}

```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

sources, err := testClient.GetSources(ctx)
if err != nil {
    //handle get sources error
    return
}
```
{{< /codecontent >}}

{{< codecontent >}}

```javascript
client.connect().then((response) => {
    return client.getSources();
}).then((sources) => {
    client.close();
}).catch((error) => {
    //handle get sources error
    client.close();
});
```
{{< /codecontent >}}
{{< /codetoggle >}}

## Getting all known keys for a source
You can use the following code to find all known keys for a given source.

{{< codetoggle >}}
{{< codecontent >}}

```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

keys, err := testClient.GetKeys(ctx, "source")
if err != nil {
    //handle get keys error
    return
}
```
{{< /codecontent >}}
{{< codecontent  >}}

```javascript
client.connect().then((response) => {
    return client.getKeys('source');
}).then((keys) => {
    client.close();
}).catch((error) => {
    //handle get keys error
    client.close();
});
```
{{< /codecontent >}}
{{< /codetoggle >}}

## Removing a source
You can use the following code to remove a source from Iris.

{{< codetoggle >}}
{{< codecontent >}}

```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

if err := testClient.RemoveSource(ctx, "source"); err != nil {
    //handle remove source error
    return
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
client.connect().then((response) => {
    return client.removeSource('source');
}).then((keys) => {
    client.close();
}).catch((error) => {
    //handle remove source error
    client.close();
});
```
{{< /codecontent >}}
{{< /codetoggle >}}

## Removing a value
You can use the following code to remove a key-value pair from Iris.

{{< codetoggle >}}
{{< codecontent >}}

```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

if err := testClient.RemoveValue(ctx, "source", "key"); err != nil {
    //handle remove value error
    return
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
client.connect().then((response) => {
    return client.removeValue('source', 'key');
}).then((keys) => {
    client.close();
}).catch((error) => {
    //handle remove value error
    client.close();
});
```
{{< /codecontent >}}
{{< /codetoggle >}}


## Subscribing to a source
Subscribing to a source allows you to stream any changes to it as Iris knows about it.  This allows your application to quickly respond to any changes posted to this source.

{{< codetoggle >}}
{{< codecontent >}}

```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

var handler UpdateHandler = func(u *pb.Update) {
    //this will be called when a value is updated
    fmt.Println("Received updated value", u.Value, "for source", u.Source, "and key", u.Key)
}

if _, err := testClient.Subscribe(ctx, "source", &handler); err != nil {
    //handle subscribe error
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
var handler = function(update){
    //this will be called when a value is updated
    console.log("Received updated value", update.value, "for source", update.source, "and key", update.key)
};

client.connect().then((response) => {
    return client.subscribe('source', handler);
}).then((response) => {
    client.close();
}).catch((error) => {
    //handle subscribe error
    client.close();
});
```
{{< /codecontent >}}
{{< /codetoggle >}}

## Subscribing to a source and key
If you just want to hear about changes to a particular key-value pair, you can do that as well.  Subscribing to a key allows you to stream any changes to a specific key of a source as Iris knows about it.  This allows your application to quickly respond to any changes posted to this key.

{{< codetoggle >}}
{{< codecontent >}}

```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

var handler UpdateHandler = func(u *pb.Update) {
    //this will be called when a value is updated
    fmt.Println("Received updated value", u.Value, "for source", u.Source, "and key", u.Key)
}

if _, err := testClient.SubscribeKey(ctx, "source", "key", &handler); err != nil {
    //handle subscribe key error
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
var handler = function(update){
    //this will be called when a value is updated
    console.log("Received updated value", update.value, "for source", update.source, "and key", update.key)
};

client.connect().then((response) => {
    return client.subscribeKey('source', 'key', handler);
}).then((response) => {
    client.close();
}).catch((error) => {
    //handle subscribe key error
    client.close();
});
```
{{< /codecontent >}}
{{< /codetoggle >}}

## Unsubscribing an update handler
If you subscribed an update handler to a source or key, unsubscribing the handler is easy.  Just use the unsubscribe method that matches the subscribe method you used.

{{< codetoggle >}}
{{< codecontent >}}

```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

var handler UpdateHandler = func(u *pb.Update) {
    //this will be called when a value is updated
    fmt.Println("Received updated value", u.Value, "for source", u.Source, "and key", u.Key)
}

// Unsubscribe from the entire source
if _, err := testClient.Unsubscribe(ctx, "source", &handler); err != nil {
    //handle Unsubscribe error
}

// Unsubscribe from the key
if _, err := testClient.UnsubscribeKey(ctx, "source", "key", &handler); err != nil {
    //handle UnsubscribeKey error
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
var handler = function(update){
    //this will be called when a value is updated
    console.log("Received updated value", update.value, "for source", update.source, "and key", update.key)
};

client.connect().then((response) => {
    return client.unsubscribe('source', handler);
}).then((response) => {
    return client.unsubscribeKey('source', 'key', handler);
}).then((response) => {
    client.close();
}).catch((error) => {
    client.close();
});
```
{{< /codecontent >}}
{{< /codetoggle >}}
