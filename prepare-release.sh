#!/bin/bash

set -euo pipefail

echo "Retrieving all branches & tags"
git fetch --all

echo "Finding latest release branch"
release_version=$(git branch -r | grep release | awk -F/ '{ print $3 }' | sort -Vr | head -n 1)

echo "Confirming release version $release_version is a unique tag"
if [[ $(git tag -l | grep -q "$release_version"; echo $?) == "0" ]]; then
  echo "Desired release version $release_version has already been released."
  exit 1
fi

echo "Installing dependencies"
npm install

echo "Compiling source"
npm run build

echo "Updating package version to $release_version"
npm version --no-git-tag-version "$release_version"

git config user.name "keithalpichi"
git config user.email "keithalpichi@example.com"

git add .
git commit -m "$release_version"

echo "Pushing changes to repository"
git push origin master

echo "Creating new $release_version tag"
git tag "$release_version"
echo "Pushing $release_version tag to repository"
git push origin "$release_version"