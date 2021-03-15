#!/usr/bin/env sh

set -euo pipefail

v_type="patch"
if [[ $# > 0 ]]; then
  v_type="$1"
fi

if [[ "$v_type" != "patch" ]] && [[ "$v_type" != "minor" ]] && [[ "$v_type" != "major" ]]; then
  echo "Please provide 'patch', 'minor', or 'major' to script"
  exit 1
fi

echo "Compiling source"
npm run build

git add ./dist/index.js

echo "Updating $v_type package version"
npm version --no-git-tag-version "$v_type"
git add ./package-lock.json ./package.json
version=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
git commit -m \""$version"\"

echo "Pushing changes to repository"
git push origin master

echo "Creating new $version tag"
git tag "$version"
echo "Pushing $version tag to repository"
git push origin "$version"