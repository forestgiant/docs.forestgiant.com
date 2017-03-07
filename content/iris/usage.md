+++
date = "2017-03-06T15:18:17-05:00"
title = "Iris | Usage"

+++

**Getting Iris:**
- You can download Iris from <http://www.getotis.com/download/iris> or clone the code from github <http://www.github.com/otis/iris>
- Iris is written in Go and requires a setup Go (>= 1.7) environment <https://golang.org/doc/install> to build to code.  Iris is written in pure Go and supports all the platforms that Go does.

**Running Iris:**
- Once you have downloaded Iris the quickest way to run it without additional configuration is with the command `iris -insecure -nostela`.  This will run Iris on the default port `32000` with an ssl cert or with the location of the Stela instance.  
- If you remove the `-nostela` flag Iris will look for Stela on its default address `127.0.0.1:31000`.  If this is not the correct Stela address you can use the `-stela` flag to specify it.  By using Stela you can launch multiple instances of Iris and they will use raft consensus to add fault tolerance to your key value store.
- The `-raftdir` flag specifies the location of the key value store db.  By default its a folder called `raftDir` but you can specify it to be whatever you like.  This will persist between runs.
- The `-join` flag will specify the address of the raft leader and not rely on Stela to find it.
