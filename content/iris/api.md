+++
date = "2017-03-06T15:18:23-05:00"
title = "Iris | Go API Docs "
+++

**Creating a Client:** Iris uses gRPC behind the scenes for communication between the API and the service. When doing any transaction between the API and the service we recommend creating a context with a timeout.  We recommend always adding a timeout to your context and only reusing a context for requests that make sense.  The timeout amount should be the max amount of time you think it should take for the service to respond to your request, typically this is very quick.
```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

testClient, err := NewClient(ctx, "127.0.0.1:32000", nil)
if err != nil {
    //handle connection error
    return
}
defer testClient.Close()
```

**Getting values for a source and key:** Iris makes it easy to retrieve a value for a given source and key once you have a client instance. When getting or setting values with the Iris API the data needs to be encoded into a byte slice.  If this is a struct then you will need to create your own encoding and decoding method.  If it is a simple string then you can cast it in and out of a `[]byte` slice.
```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

value, err := testClient.GetValue(ctx, "source", "key")
if err != nil {
    //handle GetValue error
    return
}
```

**Setting values for a source and key:** Similar to getting values you need to first encode your data as a `[]byte` slice then you can set the value for the key and source.
```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

if err := testClient.SetValue(ctx, "source", "key", []byte("value")); err != nil {
    //handle SetValue error
    return
}
```

**Subscribing to a source and key:** Subscribing to a key allows you to stream any changes to it as Iris knows about it.  This allows your application to quickly respond to any changes posted to Iris.
```golang
ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
defer cancel()

var handler UpdateHandler = func(u *pb.Update) error {
    //this will be called when a value is updated for the key
    fmt.Println("Received updated value", u.Value, "for source", u.Source, "and key", u.Key)
    return nil
}

if _, err := testClient.SubscribeKey(ctx, "source", "key", &handler); err != nil {
    //handle SubscribeKey error
}
```
