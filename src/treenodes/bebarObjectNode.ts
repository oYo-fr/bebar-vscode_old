import { Bebar } from "bebar";
import { BebarNode } from "./BebarNode";
import * as vscode from "vscode";
import * as path from "path";

export class BebarObjectNode extends BebarNode {
  constructor(
    public readonly key: string,
    public readonly value: Object,
    public readonly bebar: Bebar
  ) {
    super(
      key,
      value as any,
      bebar,
      value !== null && typeof value === "object"
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None
    );

    if (Array.isArray(value)) {
      this.description = `(${value.length})`;
      this.tooltip = `${this.label} (${value.length})`;
    } else {
      this.tooltip = "";
      if (typeof value !== "object" && value !== null) {
        this.description = `(${value})`;
        this.tooltip = `${value}`;
      }
    }
  }

  getChildren(): BebarObjectNode[] {
    const result: BebarObjectNode[] = [];
    const valueObject = this.value as Object;

    if (valueObject !== null && typeof valueObject === "object") {
      Object.keys(valueObject).map((key: string) => {
        // @ts-ignore
        const v = valueObject[key];
        result.push(new BebarObjectNode(key, v as Object, this.bebar));
      });
    }
    return result;
  }
}
