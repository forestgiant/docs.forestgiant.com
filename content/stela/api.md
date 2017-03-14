+++
date = "2017-03-06T15:17:58-05:00"
title = "Stela API Reference"
weight = "20"

+++

Creating a Client
----------------
Stela uses gRPC behind the scenes for communication between the API and the service. When doing any transaction between the API and the service we recommend creating a context with a timeout.  We recommend always adding a timeout to your context and only reusing a context for requests that make sense.  If you are running Stela locally the response time should be quick between the application and the service.  If you prematurely close the Stela client it will remove all connections to Stela you have open.

{{< codetoggle >}}
{{< codecontent >}}

```golang
import (
    ...
    "github.com/forestgiant/stela"
    stela_api "github.com/forestgiant/stela/api"
    ...
)

...

ctx, cancelFunc := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancelFunc()
client, err := stela_api.NewClient(ctx, stela.DefaultStelaAddress, nil)
if err != nil {
    log.Fatal(err)
}
defer client.Close()
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
const stela_api = require('stela-nodejs/api')
const messages = require('stela-nodejs/stela_pb');
....
const client = new stela_api(stela_api.defaultStelaAddress, '')
```
{{< /codecontent >}}
{{< /codetoggle >}}

Creating a Service
--------------
The service struct contains the data that the stela service will store and return when asked to discover a service by name.  When discovering a service stela will also add the IPv4/IPv6 address to this struct.

{{< codetoggle >}}
{{< codecontent >}}

```golang
service := &stela.Service{
    Name: "test.myservice.mydomain",
    Port: 8001,
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
const service = new messages.ServiceMessage();
service.setName('test.myservice.mydomain');
service.setPort(8001);
```
{{< /codecontent >}}
{{< /codetoggle >}}

You can optionally add any value you like to the service.  The Value type is type `interface{}` so any struct or primitive type should work here.  This is especially useful if you have multiple instances of a service name but still need to differentiate them.

{{< codetoggle >}}
{{< codecontent >}}

```golang
myDate := stela.EncodeValue('Test')
service := &stela.Service{
    Name: "test.myservice.mydomain",
    Port: 8001,
    Value: myData,
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
const service = new messages.ServiceMessage();
service.setName('test.myservice.mydomain');
var myData = Buffer.from(value).toString('Test')
service.setValue(myData);
```
{{< /codecontent >}}
{{< /codetoggle >}}

Registering a Service
-------------
Registering with Stela allows other clients to discover that service.

{{< codetoggle >}}
{{< codecontent >}}

```golang
registerCtx, cancelRegister := context.WithTimeout(context.Background(), 50*time.Millisecond)
defer cancelRegister()
if err := client.Register(registerCtx, service); err != nil {
    log.Fatal(err)
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
client.register(service)
    .catch(error => {
        //Handle error
        console.log("Error", error);
    });
```
{{< /codecontent >}}
{{< /codetoggle >}}

Deregistering a Service
--------------
It is a best practice to ensure that you deregister any registered services when that service is not available or the application is ending.

{{< codetoggle >}}
{{< codecontent >}}

```golang
deregisterCtx, cancelDeregister := context.WithCancel(context.Background())
defer cancelDeregister()
err = client.Deregister(deregisterCtx, service)
if err != nil {
    log.Fatal(err)
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
client.deregister(service)
    .catch(error => {
        //Handle error
        console.log("Error", error);
    });
```
{{< /codecontent >}}
{{< /codetoggle >}}

Discovering Services
--------------
Discover returns all instances of a service known by stela. The slice of services contains populated IPv4 and IPv6 as well as the properties that were added when the service was registerd including the Value `interface{}`.

{{< codetoggle >}}
{{< codecontent >}}

```golang
discoverCtx, cancelDiscover := context.WithCancel(context.Background())
defer cancelDiscover()
services, err := client.Discover(discoverCtx, "test.myservice.mydomain")
if err != nil {
    log.Fatal(err)
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
client.discover('test.myservice.mydomain')
    .then(services => {
        // Services found! Do something with the service instances
    }).catch(error => {
        //Handle error
        console.log("Error", error);
    });
```
{{< /codecontent >}}
{{< /codetoggle >}}

If you only need a single instance of a service you can instead use `DiscoverOne`.  This is useful for when you have multiple instances running but only for fault tolerence purposes so you only ever need to interact with a single instance.  For example, if you have multiple iris instances running an they are using raft replication, you would only need to find one of those instances to use Iris.

{{< codetoggle >}}
{{< codecontent >}}

```golang
discoverCtx, cancelDiscover := context.WithCancel(context.Background())
defer cancelDiscover()
service, err := client.DiscoverOne(discoverCtx, "test.myservice.mydomain")
if err != nil {
    log.Fatal(err)
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
client.discoverOne('test.myservice.mydomain')
    .then(service => {
        // Service found! Do something with the service instances
    }).catch(error => {
        //Handle error
        console.log("Error", error);
    });
```
{{< /codecontent >}}
{{< /codetoggle >}}


Subscribing to Services
-------------
Subscribing to a service will let you know when an instance of a service is registered or deregistered from stela.  The `Action` property will be set to either `RegisterAction` or `DeregisterAction`.

{{< codetoggle >}}
{{< codecontent >}}

```golang
subscribeCtx, cancelSubscribe := context.WithTimeout(context.Background(), 50*time.Millisecond)
defer cancelSubscribe()
client.Subscribe(subscribeCtx, "test.myservice.mydomain", func(s *stela.Service) {
    switch s.Action {
    case stela.RegisterAction:
        fmt.Println("a service was registered!", s)
    case stela.DeregisterAction:
        fmt.Println("a service was deregistered", s)
    }
})
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
const subscribeCallback = (service) => {
    if(service == nil) {
        return
    }

    if(service.getAction() == stela_api.actions.RegisterAction) {
        console.log("a service was registered!", service)
    } else if(service.getAction() == stela_api.DeregisterAction) {
        console.log("a service was deregistered!", service)
    }
};

client.subscribe('test.myservice.mydomain', subscribeCallback).catch(error => {
    //Handle error
    console.log("Error", error);
})
```
{{< /codecontent >}}
{{< /codetoggle >}}

Unsubscribing to Services
-----------
Unsubscribing from a service string will remove all callbacks from being called that were registered to that string.

{{< codetoggle >}}
{{< codecontent >}}

```golang
unsubscribeCtx, cancelUnsubscribe := context.WithTimeout(context.Background(), 50*time.Millisecond)
defer cancelUnsubscribe
err := client.Unsubscribe(unsubscribeCtx, "test.myservice.mydomain")
if err != nil {
    log.Fatal(err)
}
```
{{< /codecontent >}}
{{< codecontent >}}

```javascript
client.unsubscribe('test.myservice.mydomain').catch(error => {
    //Handle error
    console.log("Error", error);
})
```
{{< /codecontent >}}
{{< /codetoggle >}}
