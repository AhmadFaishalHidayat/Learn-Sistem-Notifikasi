let amqp = require("amqp");
let socket = require("socket.io");
let rabbit = amqp.createConnection({ host: "amqp://localhost:5672" });
let io = socket(5000);

rabbit.on("ready", () => {
  console.log("RabbitMQ is connected");
  rabbit.queue(
    "sistem.notification.queue",
    { autoDelete: false, durable: true },
    (queue) => {
      queue.subscribe((message) => {
        console.log(message);
        io.emit("notification baru", message);
      });
    }
  );
});
