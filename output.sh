#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="scripts"
DST_DIR="output"

PROJECT_ROOT="$(basename "$PWD")"
SERVICE_NAME="${PROJECT_ROOT%-scripts}"

DEPLOY_BASE="$HOME/Desktop/TFG/App/services-deployment/scripts"
DEPLOY_DIR="$DEPLOY_BASE/$SERVICE_NAME"

# create if not exists output directory
mkdir -p "$DST_DIR"
mkdir -p "$DEPLOY_DIR"

find "$SRC_DIR" -type f -name '*.js' | while IFS= read -r file; do
  script_id="$(basename "$(dirname "$file")")"
  name="$(basename "$file")"
  
  # <project_root>_<script_id>_<original_filename>.sql
  new_name="${PROJECT_ROOT}_${script_id}_${name}"
  
  # Copy to output directory
  cp "$file" "$DST_DIR/$new_name"

  # Copy to deployment directory
  cp "$file" "$DEPLOY_DIR/$new_name"
done

echo "Todos los scripts han sido copiados a la carpeta '$DST_DIR' y '$DEPLOY_DIR'."