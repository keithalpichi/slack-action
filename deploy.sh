#!/usr/bin/env sh

set -euo pipefail

echo "Compiling source"
npm run build

if [[ $(git status | grep 'dist/index.js'; echo $?) == "0" ]]; then
  echo "Commiting new build"
  git commit 'new build'
fi

echo "Pushing changes to repository"
git push origin master