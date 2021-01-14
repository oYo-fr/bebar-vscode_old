import { Bebar } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";
import { BebarDataListNode } from "./BebarDataListNode";
import { BebarHelpersNode } from "./BebarHelpersNode";
import { BebarPartialsNode } from "./BebarPartialsNode";
import { BebarTemplatesNode } from "./bebarTemplatesNode";
import { BebarNextListNode } from "./bebarNextListNode";
import { BebarFileNode } from "./bebarFileNode";

export class BebarNextNode extends BebarFileNode {
  constructor(
    public readonly context: Bebar,
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super(
      "./" +
        path.relative(context.workingDir, context.file).replace(/\\/gi, "/"),
      context.file,
      context,
      context,
      collapsibleState
    );

    var relativePath =
      "./" +
      path.relative(context.workingDir, context.file).replace(/\\/gi, "/");
    this.tooltip = `${this.label} (${relativePath})`;
    this.description = `(${relativePath})`;
  }

  getChildren(): BebarNode[] {
    return [
      new BebarDataListNode(this.bebar.data, this.bebar),
      new BebarHelpersNode(this.bebar.helpers, this.bebar),
      new BebarPartialsNode(this.bebar.partials, this.bebar),
      new BebarTemplatesNode(this.bebar.templates, this.bebar),
      new BebarNextListNode(this.bebar.nextBebars, this.bebar),
    ];
  }
}
