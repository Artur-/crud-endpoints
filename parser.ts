const fs = require("fs");
const ts = require("typescript");

const replacements = {
  generateDiv: "<div>${item.firstName}</div><div>${item.lastName}</div>",
};

const originalCode = fs.readFileSync("./frontend/my-view.ts", "utf8");
const source = ts.createSourceFile(
  "my-view.ts",
  originalCode,
  ts.ScriptTarget.Latest
);

const visitor = (node) => {
  if (node.kind == ts.SyntaxKind.TemplateExpression) {
    const functionName =
      node.templateSpans[0].expression.expression.escapedText;
    if (replacements[functionName]) {
      const originalCode = source.getFullText();
      const newCode =
        originalCode.substring(0, node.pos + 1) +
        replacements[functionName] +
        originalCode.substring(node.end - 1);
      console.log(newCode);
    }
  }
};

const visit = (node, visitor) => {
  visitor(node);
  node.forEachChild((child) => {
    visit(child, visitor);
  });
};

visit(source, visitor);
