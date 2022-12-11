const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  //   organization: "org-TMrvqmmeP3O0HMNdV0WJu7wl",

  apiKey: "your OpenAI API key",
});
const openai = new OpenAIApi(configuration);

async function GetAIResponse(msg) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: msg,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });

  return response.data["choices"][0]["text"];
}

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready");
});

client.on("message", (message) => {
  const msg = message.body;

  const usermsg = msg.split("/")[1];
  if (Array.from(msg)[0] == "/") {
    console.log(message.from + "-----" + message.body);

    (async () => {
      const AIres = await GetAIResponse(usermsg);
      client.sendMessage(message.from, AIres);
    })();
  }
});

client.initialize();
