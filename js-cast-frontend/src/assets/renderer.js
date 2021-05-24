console.log("Hello World, from Renderer.js");

var window;

window.api.receive("pong", (ev, args) => {
  console.log("Renderer.js", ev, args)
})

window.api.send("ping", "hello")
