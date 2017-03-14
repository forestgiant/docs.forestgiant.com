+++
date = "2017-03-06T15:17:41-05:00"
title = "Stela Usage"
weight = "30"
+++

## Getting Stela
- Clone the code from github <http://www.github.com/forestgiant/stela>
- Stela is written in Go and requires a setup Go (>= 1.7) environment <https://golang.org/doc/install> to build to code.  Stela is written in pure Go and supports all the platforms that Go does.

## Running Stela
- To use the default port of `31000` and default multicast port of `31053` simply run the command without any flags `stela`.
- Use the `-port` flag to specify the tcp port that Stela runs on
- Use the `-multicast` flag to specify the multicast port that Stela uses.  The multicast port is how the instances of Stela running on the local network will be able to communicate with each other.
