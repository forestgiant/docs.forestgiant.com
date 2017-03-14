---
date: 2016-03-08T21:07:13+01:00
title: Platform Overview
type: index
weight: 10

---

Our platform is a set of services and tools designed to streamline local application discovery and communication. Currently it is comprised of two open source microservices, Stela and Iris.  The former provides an easy to use service discovery service, while the later is a distributed key-value store.


{{< flex-row >}}

  {{< flex-column >}}
  <h3>Architecture</h3>
  <p>The services were designed with distributed computing in mind.  By utilizing UDP multicast and Raft consensus Stela and Iris make connecting local networked applications easy to make.</p>
  {{< /flex-column >}}

  {{< flex-column >}}
  <h3>Services</h3>
  <p>There are two core micro-services comprising our platform, Stela and Iris. Stela is a distributed discovery service that streamlines finding services and subscribing to those services.  Iris is a distributed streaming key value store service.</p>
  {{< /flex-column >}}

  {{< flex-column >}}
  <h3>Approach</h3>
  <p>These services were designed around making it easy to create connected applications that function on a local network. Iris is perfect for storing configuration data about a dynamic set of services in your local network.</p>
  {{< /flex-column >}}

{{< /flex-row >}}


---

## Stela
Stela is a distributed discovery service meant to be run on local networks.  Stela was designed so that a copy of the Stela daemon is running on each node that either has a service to register or is discovering a service.  There are two requirements for the Stela daemons to be able to talk with each other: they need to be on the same local network, and they need to be using the same multicast port.  If those requirements are met, an application can interact with the Stela instance running on the same host and know what services are registered to all other instances running using the same multicast.

### How do I use Stela?
Stela is meant to be run on a each host that either has a service it needs to register or wants to discover running services.  Get the code on github <http://www.github.com/forestgiant/stela>. When running Stela you can pick the TCP port you want to run it on as well as the multicast port.  The multicast port that facilitates the communication between all the Stela instances running on your local network.  Once you have Stela running you can use either the node.js Stela API or the Go Stela API to connect to the locally running Stela instance and either register a service or discover other running services. See the Stela docs <http://docs.forestgiant.com/stela> for more information.

### How can I make my existing service discoverable?
In additional to having a node.js and Go API there is also a Stela watch dog utility command.  This command was designed to allow you to register existing services with Stela.  For example you could make a local service like influxdb or mongodb discoverable by other applications using Stela.  See the Stela watch dog docs <http://docs.forestgiant.com/stela/watchdog> for more information.

---

## Iris
Iris is a distributed streaming key value store.  Iris can be run as a single instance on your network or as multiple instances to add additional fault tolerance.  Iris uses the raft consensus algorithm to distribute the key value data across the other running nodes. Iris is a designed to be very easy to use. Iris lets you organize keys into sources.  One use case of this is to store different configuration data for a given key across different sources.  You can then switch the source without worrying about losing the value data stored in previous source.

### How do I use Iris?
Iris can be run on a single node or many for fault tolerance on your network. Clone it on github <http://www.github.com/forestgiant/iris>. If using multiple nodes look into the best practices for the raft algorithm <https://raft.github.io/>.  The key value store data is stored in the raftDir.  You can use the `-raftdir` flag to specify where you want this data to go when running Iris.  Iris is also designed to work with Stela so you can use the `-stela` flag to specify where the stela instance is.  This will make Iris discoverable by processes using the Stela API on the same multicast port.  Once you have the Iris command setup you can use either the node.js API or the Go API to connect to Iris and start setting/getting keys, values and sources.  See the Iris docs <http://docs.forestgiant.com/iris/usage> for more information.

---
## Building Applications
Our platform core services of Stela and Iris are designed to make it easy to connect to applications running on a local network.  By utilizing Stela for service discovery you can create applications that don't require additional configuration as IP addresses change or nodes come and go from the network.  Iris can store multiple sets of application configuration information and easily give your app a persistent state that is easy to update from any other app using Iris.

### Best Practices
- To get the most out of Stela it is best to run an instance of the service on each node that wishes to register or discover a service on the network.  
- Stela comes with a default port and mulitcast and if you are the only user/developer it should not be a problem, but once you go to production with your application it is best to use a different port and multicast than the default.
- `Portutil` is a handy Go package that dynamically finds any open ports on your system <https://github.com/forestgiant/portutil>.  This is helpful when developing and testing applications on a single computer.

### Contribute + Join the Community
Our platform core services of Stela and Iris are open source and licensed under the Apache 2.0.  We want to encourage people to post any problems they might have on the github issues pages for the respective service as well as join us on Gitter <http://www.gitter.com/forestgiant> to ask any questions or post problems with your application.
