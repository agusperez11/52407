grammar SubCLite;

programa: instrucciones EOF;

instrucciones:
    instruccion
    | instrucciones instruccion
;

instruccion: bucle;

bucle:
    'do' '(' sentencia ')' 'while' '(' condicion ')' ';'
;

sentencia:
    salida
    | salida sentencia
    | terminar
;

salida:
    'puts' '(' cadena ')' ';'
;

terminar:
    'break' ';'
;

condicion:
    '0'
    | '1'
;

cadena:
    '"' caracteres '"'
;

caracteres:
    caracter
    | caracteres caracter
;

caracter:
    letra
    | digito
    | simbolo
;

letra:
    [a-zA-Z]
;

digito:
    [0-9]
;

simbolo:
    '.' | ',' | '!' | '?' | ':' | ';' | '\''
;

WS: [\t\n\r ]+ -> skip;

