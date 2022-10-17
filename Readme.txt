This app was build using "The Node Beginner Book" by Manuel Kiessling.
The book introduces node.js starting from 
console.log("Hello World")
node helloworld.js
And guides the reader to create a web app that can upload images.
APP STACK:
- Http server
- Router
- Request handlers
- Request data handlers
- View logic
- Upload handling

We are going to build a modular app to have readability even if the app grows larger.

First we learn what passing functions around means.
In JavaScript, functions can be passed as parameters like any other value. 
This makes it posible to use event driven, asynchronous callbacks.
This also introduces the concept of blocking.
In JS, functions can be passed into other functions before the first one returns a value.
This makes it so that multiple functions can run in the background asynchronously.
Our program makes a mental note of a value that is yet to return, and instead of waiting for it(this can be a long time),
the program runs the next step. The two steps of the program are non-blocking this way.
Once the value of the first function returns, it is injected into the process and becomes a real value.

In this app, we've devided the functionality of the program into multiple parts. 
Index.js is our main file, it sets up and starts our Server.js
It directs to the "/" path as default.
Index directs incoming requests to the appropriate modules.

Server.js is responsible for listening to incoming requests.
Then it sends the requests to the Router.js 
The router identifies the request and routes it to the appropriate request handler.
The requestHandler.js manages the recieved request and does the appropriate actions. It also returns data as a response.

I've run into some problems but the code works in general :/

I had a problem with fs and its path finding methods so I had to create a file name tmp in C: and put my test.png image in there :(
    When I gave fs.rename(files.upload.filepath, "/tmp/test.png" a different directory, An error saying I don't have the authority to change the path appeared.
    I tried running as admin but didn't work. I think its a problem on windows and would not appear on linux distros.

I also had trouble when converting index's const statements from CommonJS form to ES form. So I left it as is.