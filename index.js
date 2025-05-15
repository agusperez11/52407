
const antlr4 = require('antlr4');
const fs = require('fs');
const SubCLiteLexer = require('./antlr/SubCLiteLexer').SubCLiteLexer;
const SubCLiteParser = require('./antlr/SubCLiteParser').SubCLiteParser;
const SubCLiteListener = require('./antlr/SubCLiteListener').SubCLiteListener;
const SubCLiteVisitor = require('./antlr/SubCLiteVisitor').SubCLiteVisitor;
const input = fs.readFileSync('input.txt', 'utf8');
const chars = new antlr4.InputStream(input);
const lexer = new SubCLiteLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new SubCLiteParser(tokens);
class ErrorListener extends antlr4.error.ErrorListener {
    syntaxError(recognizer, offendingSymbol, line, column, msg) {
        console.error(`Error de sintaxis en línea ${line}, columna ${column} : ${msg}`);
        ProcessingInstruction.exit(1);
    }
}
parser.removeErrorListeners();
parser.addErrorListener(new ErrorListener()); 
const tree = parser.programa();
console.log('\nEntrada valida. anslisis completado sin errores.');
console.log('\nTabla de lexemas y tokens:');
tokens.fill();
tokens.getTokens().forEach(token => {
    const type = lexer.symbolicNames[token.type];
    if (type) {
        console.log (`Lexema: '${token.text}' => Token: ${type}´ `); 
        }
    });
const {Trees} = import('antlr4/tree/Tree');
console.log('\nArbol de sintactico:');
console.log(Trees.toStringTree(tree, parser.ruleNames));
