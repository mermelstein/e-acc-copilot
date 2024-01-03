# e-acc-copilot

This is a Visual Studio Code extension that uses OpenAI's GPT model to generate text based on the content of a file named `llm.txt` in your workspace.

Get it here:

[![Visual Studio Marketplace](https://img.shields.io/badge/Marketplace-e--acc--copilot-blue?logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=YourPublisherName.e-acc-copilot)

## Features

* Prompts for OpenAI key and GPT model if not already set in the configuration settings.
* Saves `llm.txt` if it's open in an editor before sending the content to OpenAI.
* Shows a progress notification while the AI is generating the text.
* Appends the AI's response to `llm.txt`.

![Demo](./e-acc-copilot-demo.gif)

## Usage

1. Open a workspace in Visual Studio Code.
2. Create a file named `llm.txt` in the workspace.
3. Write some text in `llm.txt`.
4. Run the `AI Ask` command from the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).

The AI's response will be appended to `llm.txt`.

If you want to update the OpenAI model you're using or your API key, open the e/acc Copilot settings from the Extension panel. Open `Extension Settings` and in the User tab update the values for GPT Model and/or OpenAI Key.
If these are empty (ie you just installed the extension) you will be prompted for them when you run the `AI Ask` command.

## Requirements

* Visual Studio Code 1.58.0 or later
* Node.js 12.14.0 or later
* OpenAI API Key (users are prompted for this if it doesn't exist and is stored in your local extension settings)

## Extension Settings

This extension adds the following configuration settings:

* `e-acc-copilot.openAIKey`: Your OpenAI key.
* `e-acc-copilot.gptModel`: The GPT model to use.

You can set these configuration settings in your user or workspace settings.

## Known Issues

None at the moment.

## Release Notes

### 0.0.1

Initial release of e-acc-copilot.
