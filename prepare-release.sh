#!/bin/bash

set -euo pipefail

echo "Retrieving all branches & tags"
git fetch --all
git fetch --tags

echo "Finding latest release branch"
release_version=$(git branch -r | grep release | awk -F/ '{ print $3 }' | sort -Vr | head -n 1)

pkg_version=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo "Package version: $pkg_version"
echo "Release version: $release_version"
echo "Current tags"
git tag -l
if [[ $(git tag -l | grep -q "$release_version"; echo $?) == "0" ]]; then
  echo "Desired release version \"$release_version\" has already been released."
  echo "Skipping the rest of this step."
  # this is necessary to prevent infinite loops in the Github actions
  exit 0
fi
echo "Confirmed release version $release_version is a unique tag"

if [[ $release_version == $pkg_version ]]; then
  echo "Package version $pkg_version and release version $release_version cannot be the same."
  exit 0
fi

echo "Updating package version to $release_version"
npm version --no-git-tag-version "$release_version"

echo "Installing dependencies"
npm install

echo "Compiling source"
npm run build

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