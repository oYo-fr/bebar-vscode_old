import { Bebar, Datafile } from "bebar";
import * as vscode from "vscode";
import * as path from "path";
import { BebarObjectNode } from "./BebarObjectNode";

export class BebarDataNode extends BebarObjectNode {
  constructor(
    public readonly context: Datafile,
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super(context.name, context.data as any, bebar);

    var relativePath =
      "./" + path.relative(bebar.workingDir, context.file).replace(/\\/gi, "/");
    this.description = `(${relativePath})`;
  }
  command = {
    command: "vscode.open",
    title: "Open File",
    arguments: [vscode.Uri.file(this.context.file)],
  };
}
