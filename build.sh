#!/bin/bash

# Crear carpeta de salida si no existe
mkdir -p output

# Ejecutar ANTLR4 para generar código JavaScript con Visitor
java -Xmx500M -cp "./antlr-4.13.1-complete.jar" org.antlr.v4.Tool -Dlanguage=JavaScript -visitor SubCLite.g4 -o output

echo "✅ Generación completada en la carpeta ./output"
