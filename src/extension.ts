// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dev-assist" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('dev-assist.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from Dev Assist!');
	// });

	// context.subscriptions.push(disposable);

	const generateCodePrefix = '===============Generate Code==============\n';
	const originCodePrefix = '\n\n===============Origin Code==============\n';
	const codeToSinppet = vscode.commands.registerCommand('dev-assist.codeToSinppet', function () {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			const txt = document.getText(selection) || document.getText();
			const rows = txt.trim().split('\n');
			const _rows = rows.map(r => `"${r.replace(/"/g, '\\"')}"`);


			editor.edit(editBuilder => {
				editBuilder.insert(new vscode.Position(0, 0), `${generateCodePrefix}${_rows.join(',')}${originCodePrefix}`);
			});
		}
	});



	const snippetToCode = vscode.commands.registerCommand('dev-assist.snippetToCode', function () {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			const txt = document.getText(selection) || document.getText();
			const body = txt.trim().slice(0, -1).split('",');
			const code = body.map(s => s.slice(1).replace(/\\/g, '')).join('\n');

			editor.edit(editBuilder => {
				editBuilder.insert(new vscode.Position(0, 0), `${generateCodePrefix}${code}${originCodePrefix}`);
			});
		}
	});

	// context.subscriptions.push(disposable);
	context.subscriptions.push(codeToSinppet);
	context.subscriptions.push(snippetToCode);

}

// This method is called when your extension is deactivated
export function deactivate() { }
