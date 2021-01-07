import { Bebar, Helper } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";
import { BebarFileNode } from "./bebarFileNode";

export class BebarHelperNode extends BebarFileNode {
  constructor(
    public readonly func: string,
    public readonly context: Helper,
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.None
  ) {
    super(func, context.file, context as any, bebar, collapsibleState);
  }
  iconPath = {
    light: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "light",
      "command_line.svg"
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "dark",
      "command_line.svg"
    ),
  };
}
