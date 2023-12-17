const vscode = require('vscode');
const OpenAI = require('openai').OpenAI;
const fs = require('fs');
const path = require('path');

function activate(context) {
  console.log('Your extension "e-acc-copilot" is now active!');

  context.subscriptions.push(vscode.commands.registerCommand('e-acc-copilot.aiask', async () => {
    const config = vscode.workspace.getConfiguration('e-acc-copilot');

    let openAIKey = config.get('openAIKey');
    if (!openAIKey) {
      openAIKey = await vscode.window.showInputBox({ prompt: 'Enter your OpenAI key' });
      await config.update('openAIKey', openAIKey, vscode.ConfigurationTarget.Global);
    }

    const openai = new OpenAI({ apiKey: openAIKey });

    let gptModel = config.get('gptModel');
    if (!gptModel) {
      gptModel = await vscode.window.showInputBox({ prompt: 'Enter the GPT model to use. Try gpt-4-0613' });
      await config.update('gptModel', gptModel, vscode.ConfigurationTarget.Global);
    }

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('No workspace folder is open.');
      return;
    }
  
    vscode.workspace.findFiles('**/llm.txt', '**/node_modules/**', 1).then(async (files) => {
      if (files.length === 0) {
        vscode.window.showErrorMessage('The file llm.txt does not exist in the workspace. Please create a new file called llm.txt');
        return;
      }
      const filePath = files[0].fsPath;
    
      // Save llm.txt if it's open
      for (const doc of vscode.workspace.textDocuments) {
        if (doc.fileName === filePath && !doc.isUntitled) {
          await doc.save();
        }
      }
    
      const fileContent = fs.readFileSync(filePath, 'utf8');
    
      vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
      title: "AI",
      cancellable: false
    }, async (progress, token) => {
      let i = 0;
      const progressInterval = setInterval(() => {
        progress.report({ message: `Thinking${'.'.repeat(i % 4)}` });
        i++;
      }, 500);
  
      const response = await openai.chat.completions.create({
        // model: 'gpt-4-0613',
        model: gptModel,
        messages: [
          { role: 'system', content: 'You are an experienced software engineer. Please be concise and accurate in your answer, pretend you are talking to another experienced developer.' },
          { role: 'user', content: fileContent }
        ]
      });
  
      progress.report({ increment: 100 });

      const chunks = response.choices[0].message.content.split(' ');

      // Prepend a newline character to the first chunk
      chunks[0] = '\n\n' + chunks[0];

      for (let i = 0; i < chunks.length; i++) {
        fs.appendFileSync(filePath, ' ' + chunks[i]);
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms
      }

      clearInterval(progressInterval);

      vscode.window.showInformationMessage('The AI is done answering.');
    });
  });
  }));
};

function deactivate() {}

module.exports = {
  activate,
  deactivate
};