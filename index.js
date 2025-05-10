const antlr4 = require('antlr4');
const fs = require('fs');
const SubCLiteLexer = require('./output/SubCLiteLexer').SubCLiteLexer;
const SubCLiteParser = require('./output/SubCLiteParser').SubCLiteParser;
const SubCLiteListener = require('./output/SubCLiteListener').SubCLiteListener;
const SubCLiteVisitor = require('./output/SubCLiteVisitor').SubCLiteVisitor;

// Cargar el archivo de entrada
const input = fs.readFileSync('input.txt', 'utf8');
const chars = new antlr4.InputStream(input);
const lexer = new SubCLiteLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);

// Mostrar tabla de tokens
tokens.fill();
fs.writeFileSync('output/tokens.txt', tokens.tokens.map(tok => 
  `Token(${lexer.symbolicNames[tok.type]}): "${tok.text}" (line ${tok.line})`
).join('\n'));

// Parser
const parser = new SubCLiteParser(tokens);
parser.buildParseTrees = true;

try {
    const tree = parser.programa(); // Punto de entrada
    const treeStr = tree.toStringTree(parser.ruleNames);
    fs.writeFileSync('output/parseTree.txt', treeStr);
    console.log("✔️ Análisis sintáctico exitoso.");
} catch (e) {
    console.error("❌ Error de sintaxis:", e.message);
}
