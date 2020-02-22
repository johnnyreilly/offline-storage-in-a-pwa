# Offline storage in a PWA

When you are building any kind of application it's typical to want to store information which persists beyond a single user session. Sometimes that will be information that you'll want to live in some kind of centralised database, but not always.  

Also, you may want that data to still be available if your user is offline.  Even if they can't connect to the network, the user may still be able to use the app to do meaningful tasks; but the app will likely require a certain amount of data to drive that.

How can we achieve this in the context of a PWA?

#### The problem with `localStorage`

If you were building a classic web app you'd probably be reaching for [`Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) at this point.  `Window.localStorage` is a long existing API that stores data beyond a single session.  It has a simple API and is very easy to use.  However, it has a couple of problems:

1. `Window.localStorage` is synchronous.  Not a tremendous problem for every app, but if you're building something that has significant performance needs then this could become an issue.
2. `Window.localStorage` cannot be used in the context of a `Worker` or a `ServiceWorker`.  The APIs are not available there.
3. `Window.localStorage` stores only `string`s. Given [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) and [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) that's not a big problem. But it's an inconvenience.

The second point here is the significant one.  If we've a need to access our offline data in the context of a `ServiceWorker` (and if you're offline you'll be using a `ServiceWorker`) then what do you do?

#### IndexedDB to the rescue?

Fortunately, `localStorage` is not the only game in town.  There's alternative offline storage mechanism available in browsers with the curious name of [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). To quote the docs:

> IndexedDB is a transactional database system, like an SQL-based RDBMS. However, unlike SQL-based RDBMSes, which use fixed-column tables, IndexedDB is a JavaScript-based object-oriented database. IndexedDB lets you store and retrieve objects that are indexed with a key; any objects supported by the structured clone algorithm can be stored. You need to specify the database schema, open a connection to your database, and then retrieve and update data within a series of transactions.

It's clear that IndexedDB is *very* powerful.  But it doesn't sound very simple. A further look at the [MDN example](https://github.com/mdn/to-do-notifications/blob/8b3e1708598e42062b0136608b1c5fbb66520f0a/scripts/todo.js#L48) of how to interact with IndexedDB does little to remove that thought.

We'd like to be able to access data offline; but in a simple fashion.  Like we could with `localStorage` which rejoiced in a wonderfully elegant API. If only someone would build an astraction on top of IndexedDB to make our lives easier.

Someone did.

#### IDB-Keyval to the rescue!

The excellent [Jake Archibald](https://twitter.com/jaffathecake) of Google has written [IDB-Keyval](https://github.com/jakearchibald/idb-keyval) which is:

> A super-simple-small promise-based keyval store implemented with IndexedDB

The API is essentially equivalent to 

https://github.com/jakearchibald/idb-keyval

For example, a user may have preferences around the way they interact with the app