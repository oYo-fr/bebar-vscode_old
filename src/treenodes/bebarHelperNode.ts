import { Bebar, Helper } from "bebar";
import * as vscode from "vscode";
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
}
