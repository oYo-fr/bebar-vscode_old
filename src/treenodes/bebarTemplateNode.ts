import { Bebar, Datafile, Template } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";
import { BebarDataListNode } from "./BebarDataListNode";
import { BebarOutputNode } from "./BebarOutputNode";
import { BebarFileNode } from "./bebarFileNode";

export class BebarTemplateNode extends BebarNode {
  constructor(
    public readonly context: Template,
    public readonly bebar: Bebar,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super(
      context.file !== "." ? context.name : context.content,
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
      "templateFile.svg"
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "dark",
      "templateFile.svg"
    ),
  };

  getChildren(): BebarNode[] {
    const result: BebarNode[] = [];
    if (this.context.file !== ".") {
      const fileNode = new BebarFileNode(
        this.context.file,
        this.context.file,
        this.context.out,
        this.bebar
      );
      fileNode.iconPath = {
        light: path.join(
          __filename,
          "..",
          "..",
          "..",
          "resources",
          "light",
          "templateFile.svg"
        ),
        dark: path.join(
          __filename,
          "..",
          "..",
          "..",
          "resources",
          "dark",
          "templateFile.svg"
        ),
      };
      result.push(fileNode);
    }
    result.push(new BebarOutputNode(this.context.out, this.bebar, "Output: "));
    result.push(
      new BebarDataListNode(this.context.data as Datafile[], this.bebar)
    );
    return result;
  }
}
