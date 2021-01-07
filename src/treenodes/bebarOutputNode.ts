import { Bebar, Output } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";

export class BebarOutputNode extends BebarNode {
  constructor(
    public readonly context: Output,
    public readonly bebar: Bebar,
    public readonly preLabel: string = "",
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.None
  ) {
    super(
      `${preLabel}./` +
        path.relative(bebar.workingDir, context.file).replace(/\\/gi, "/"),
      context as any,
      bebar,
      collapsibleState
    );
  }
  iconPath = {
    light: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "light",
      "file.svg"
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "dark",
      "file.svg"
    ),
  };

  command = {
    command: "vscode.open",
    title: "Open File",
    arguments: [
      vscode.Uri.parse("bebar:" + this.context.file),
      {
        viewColumn: 2,
      },
    ],
  };

  getChildren(): BebarNode[] {
    return [];
  }
}
