import { Bebar } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";

export class BebarFileNode extends BebarNode {
  constructor(
    public readonly label: string,
    public readonly file: string,
    public readonly context: any,
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.None
  ) {
    super(label, context as any, bebar, collapsibleState);

    var relativePath =
      "./" + path.relative(bebar.workingDir, file).replace(/\\/gi, "/");
    this.tooltip = `${this.label} (${relativePath})`;
    this.description = `(${relativePath})`;
  }

  command = {
    command: "vscode.open",
    title: "Open File",
    arguments: [
      vscode.Uri.file(this.file),
      {
        viewColumn: 1,
      },
    ],
  };
}
