import { Bebar, Partial } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";
import { BebarFileNode } from "./bebarFileNode";

export class BebarPartialNode extends BebarFileNode {
  constructor(
    public readonly name: string,
    public readonly context: Partial,
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.None
  ) {
    super(name, context.file, context as any, bebar, collapsibleState);

    var relativePath =
      "./" + path.relative(bebar.workingDir, context.file).replace(/\\/gi, "/");
    this.tooltip = `${this.label} (${relativePath})`;
    this.description = `(${relativePath})`;
  }

  getChildren(): BebarNode[] {
    return [];
  }
}
