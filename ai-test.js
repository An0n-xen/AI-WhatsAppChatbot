const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  //   organization: "org-TMrvqmmeP3O0HMNdV0WJu7wl",

  apiKey: "your OpenAI API key",
});
const openai = new OpenAIApi(configuration);
(async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "we are talking about sex here not a todo list",
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  console.log(response.data["choices"][0]["text"]);
})();
