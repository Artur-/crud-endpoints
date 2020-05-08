const fs = require("fs");
import * as ts from "typescript";
import { generateDivCode } from "./frontend/generator";

enum Type {
  PREVIEW,
  CODE,
}
interface CodeChange {
  node: ts.Node;
  replacement: string;
}
const createTemplate = (
  code: string,
  replacements: any,
  meta: any,
  type: Type
): string => {
  const codeChanges = [];
  const source = ts.createSourceFile(
    "my-view.ts",
    code,
    ts.ScriptTarget.Latest
  );
  const getSource = (node: ts.Node): string => {
    return source.getFullText().substring(node.pos, node.end);
  };

  const isImportForIdentifier = (node: ts.Node, identifiers: string[]) => {
    if (!ts.isImportDeclaration(node)) {
      return false;
    }
    const importDeclaration = node as ts.ImportDeclaration;
    let matched = false;
    const importNode = importDeclaration.importClause;
    if (importNode.namedBindings) {
      if (ts.isNamedImports(importNode.namedBindings)) {
        const namedImports = importNode.namedBindings as ts.NamedImports;

        namedImports.elements.forEach((element) => {
          const importedIdentifier = element.name.text;
          if (identifiers.includes(importedIdentifier)) {
            matched = true;
          }
        });
      } else if (ts.isNamespaceImport(importNode.namedBindings)) {
        const namespaceImport = importNode.namedBindings as ts.NamespaceImport;
        console.log(namespaceImport.name.text);
        if (identifiers.includes(namespaceImport.name.text)) {
          matched = true;
        }
      }
    } else if (importNode.name && identifiers.includes(importNode.name.text)) {
      matched = true;
    }

    return matched;
  };

  const visitor = (node: ts.Node) => {
    if (
      type == Type.CODE &&
      isImportForIdentifier(node, Object.keys(replacements))
    ) {
      // Remove generator imports
      codeChanges.push({ node: node, replacement: "" });
    }
    if (
      type == Type.PREVIEW &&
      isImportForIdentifier(node, ["Entity", "Endpoint"])
    ) {
      codeChanges.push({ node: node, replacement: "" });
    }
    if (type == Type.CODE && ts.isTemplateExpression(node)) {
      // Replace generator calls with result
      const templateExp = node as ts.TemplateExpression;
      const exp: any = templateExp.templateSpans[0].expression;
      const functionName = exp.expression.text;
      const argumentNames = exp.arguments.map((node) => node.text);

      if (replacements[functionName]) {
        const replacement = replacements[functionName](argumentNames[0], meta);
        codeChanges.push({ node, replacement });
      }
    }
  };

  const visit = (node: ts.Node, visitor: { (node: ts.Node): void }) => {
    visitor(node);
    node.forEachChild((child) => {
      visit(child, visitor);
    });
  };

  visit(source, visitor);
  if (type == Type.PREVIEW) {
    codeChanges.push({
      node: { pos: -1, end: -1 },
      replacement: 'import { createMockEndpoint } from "./mocker";\n',
    });
    codeChanges.push({
      node: { pos: -1, end: -1 },
      replacement:
        "const Endpoint = createMockEndpoint((this as any)._entityMetadata);\n",
    });
    codeChanges.push({
      node: { pos: -1, end: -1 },
      replacement: "type Entity = any;\n",
    });
  }

  let newCode = source.getFullText();

  // Sort end to start so positions do not change while replacing
  codeChanges.sort((a, b) => {
    return a.node.pos > b.node.pos ? -1 : 1;
  });
  codeChanges.forEach((codeChange) => {
    newCode =
      newCode.substring(0, codeChange.node.pos + 1) +
      codeChange.replacement +
      newCode.substring(codeChange.node.end + 1);
  });

  return newCode;
};

// Real code down here

{
  const meta = {
    firstName: { type: "String" },
    lastName: { type: "String" },
    age: { type: "Integer" },
  };

  const replacements = {
    generateDiv: generateDivCode,
  };

  const originalCode = fs.readFileSync("./frontend/my-view.src.ts", "utf8");

  fs.writeFileSync(
    "./frontend/my-view-preview.ts",
    createTemplate(originalCode, replacements, meta, Type.PREVIEW)
  );
  fs.writeFileSync(
    "./frontend/my-view-final.ts",
    createTemplate(originalCode, replacements, meta, Type.CODE)
  );
}
