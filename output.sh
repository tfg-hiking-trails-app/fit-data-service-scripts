#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="scripts"
DST_DIR="output"

PROJECT_ROOT="$(basename "$PWD")"

# create if not exists output directory
mkdir -p "$DST_DIR"

find "$SRC_DIR" -type f -name '*.js' | while IFS= read -r file; do
  script_id="$(basename "$(dirname "$file")")"
  name="$(basename "$file")"
  
  # <project_root>_<script_id>_<original_filename>.sql
  new_name="${PROJECT_ROOT}_${script_id}_${name}"
  
  # Copiamos
  cp "$file" "$DST_DIR/$new_name"
done

echo "Todos los scripts han sido copiados a la carpeta '$DST_DIR'"