import * as vscode from "vscode";
import { BebarNodeProvider } from "./bebarNodeProvider";
import { Logger } from "./Logger";

export class OutputProvider implements vscode.TextDocumentContentProvider {
  public static readonly instance: OutputProvider = new OutputProvider();
  public bebarNodeProvider: BebarNodeProvider | undefined;

  private _onDidChange: vscode.EventEmitter<vscode.Uri> = new vscode.EventEmitter<vscode.Uri>();
  readonly onDidChange: vscode.Event<vscode.Uri> = this._onDidChange.event;

  private constructor() {}

  public async init(bebarNodeProvider: BebarNodeProvider) {
    this.bebarNodeProvider = bebarNodeProvider;
  }

  public async refresh(): Promise<void> {
    if (this.bebarNodeProvider) {
      await Promise.all(
        this.bebarNodeProvider.bebarParser.bebar.outputs.map(
          (o: { file: string }) =>
            this._onDidChange.fire(vscode.Uri.parse("bebar:" + o.file))
        )
      );
    }
  }

  provideTextDocumentContent(
    uri: vscode.Uri,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<string> {
    if (this.bebarNodeProvider && this.bebarNodeProvider.bebarParser.bebar) {
      for (
        let i = 0;
        i < this.bebarNodeProvider.bebarParser.bebar.outputs.length;
        i++
      ) {
        if (
          vscode.Uri.parse(
            "bebar:" + this.bebarNodeProvider.bebarParser.bebar.outputs[i].file
          ).path === uri.path
        ) {
          return this.bebarNodeProvider.bebarParser.bebar.outputs[i].content;
        }
      }
    }
  }
}
