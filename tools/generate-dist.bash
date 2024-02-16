#!/usr/bin/env bash

dirs=(
  "chat/delete"
  "chat/post-message"
  "chat/get-permalink"
  "chat/update"
)

for dir in ${dirs[@]}; do
  ncc build "${dir}/src/index.js" -o "${dir}/dist"
done
