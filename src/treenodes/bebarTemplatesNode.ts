import { Bebar, Template } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import { BebarTemplateNode } from "./bebarTemplateNode";

export class BebarTemplatesNode extends BebarNode {
  constructor(
    public readonly context: Template[],
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super("Templates", context, bebar, collapsibleState);
  }

  getChildren(): BebarNode[] {
    const result: BebarNode[] = [];
    this.context.map((tFile) =>
      result.push(new BebarTemplateNode(tFile, this.bebar))
    );
    return result;
  }
}
