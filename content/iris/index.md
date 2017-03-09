+++
date = "2017-03-06T15:17:58-05:00"
title = "Iris"

+++

Iris is a distributed streaming key value store.  Iris can be run as a single instance on your network or as multiple instances to add additional fault tolerance.  Iris uses the raft consensus algorithm to distribute the key value data across the other running nodes. Iris is a designed to be very easy to use. Iris lets you organize keys into sources.  One use case of this is to store different configuration data for a given key across different sources.  You can then switch the source without worrying about losing the value data stored in previous source.
