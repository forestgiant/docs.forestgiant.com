+++
date = "2017-03-06T15:17:58-05:00"
title = "Stela"

+++

Stela is a distributed discovery service meant to be run on local networks.  Stela was designed so that a copy of the Stela daemon is running on each node that either has a service to register or is discovering a service.  There are two requirements for the Stela daemons to be able to talk with each other: they need to be on the same local network, and they need to be using the same multicast port.  If those requirements are met, an application can interact with the Stela instance running on the same host and know what services are registered to all other instances running using the same multicast.

**How do I use Stela?** Stela is meant to be run on a each host that either has a service it needs to register or wants to discover running services.  You can download Stela here: <http://www.getotis.com/download/stela>, or get the code on github <http://www.github.com/otis/stela>. When running Stela you can pick the TCP port you want to run it on as well as the multicast port.  The multicast port that facilitates the communication between all the Stela instances running on your local network.  Once you have Stela running you can use either the node.js Stela API or the Go Stela API to connect to the locally running Stela instance and either register a service or discover other running services. See the Stela docs <http://www.getotis.com/docs/stela> for more information.

**How can I make my existing service discoverable?** In additional to having a node.js and Go API there is also a Stela watch dog utility command.  This command was designed to allow you to register existing services with Stela.  For example you could make a local service like influxdb or mongodb discoverable by other applications using Stela.  See the Stela watch dog docs <http://www.getotis.com/docs/stelawd> for more information.
