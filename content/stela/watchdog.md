+++
date = "2017-03-06T15:17:41-05:00"
title = "Stela Watch Dog"
weight = "40"

+++

**Getting Stelawd:**
- You can download Stela Watch Dog (stelawd) from <http://www.getotis.com/download/stelawd> or clone the code from github <http://www.github.com/otis/stela>
- Stelawd is written in Go and requires a setup Go (>= 1.7) environment <https://golang.org/doc/install> to build to code.  Stelawd is written in pure Go and supports all the platforms that Go does.

**Running Stelawd:**
- Stelawd reads a watch list file to register services with Stela.  By default it looks for a file name `watch.list`.
- You can specify the watch list file with the `-watchlist` flag
- You can specify the location of the Stela instance you want to use with the `-stelaAddr` flag

**Watch List:** The watch list format is a CSV file with the following columns: `service name, host:port, value, interval(ms)`.
- The service name is the name that will be registered with Stela. For example, test.myservice.mydomain.
- The host:port are IPv4 address and port used to communicate with the registering service.  You can omit the host portion and only provide the port if you just want to use the IP of the machine, `:31002`.  
- The value is a string that will be added to the service object returned by discovering your service with the Stela API.  
- Interval is the rate at which Stela watch dog will check to see if the service is still running on the registered port.  If it detects that the service is no longer running it will deregister that service from Stela.  If the service comes back it will re-register it with Stela.
