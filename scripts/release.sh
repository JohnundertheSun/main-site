#!/usr/bin/env bash
#
# Hands the baton back so the other person can work.
#
#   bash scripts/release.sh
#
# See COLLABORATION.md.

set -euo pipefail

BATON_FILE="ACTIVE-WORK.md"
BRANCH="main"

cd "$(git rev-parse --show-toplevel)"

me="$(git config --get collab.who || true)"
if [ -z "$me" ]; then
  echo "This repository does not know who you are yet. Run: bash scripts/setup.sh" >&2
  exit 1
fi

# Releasing with work still sitting uncommitted is how work gets forgotten.
if ! git diff --quiet || ! git diff --cached --quiet; then
  cat >&2 <<'EOF'

You still have uncommitted changes:

EOF
  git status --short >&2
  cat >&2 <<'EOF'

Commit and push them first, or stash them with 'git stash' if you meant to
throw them away. Then release.

EOF
  exit 1
fi

git checkout --quiet "$BRANCH"
git pull --rebase --quiet origin "$BRANCH"

holder="$(grep -m1 '^HOLDER:' "$BATON_FILE" | sed 's/^HOLDER:[[:space:]]*//' | tr -d '[:space:]')"

if [ "$holder" = "none" ]; then
  echo "The baton is already free. Nothing to do."
  exit 0
fi

if [ "$holder" != "$me" ]; then
  echo "$holder holds the baton, not you ($me). Nothing to release." >&2
  exit 1
fi

# Unpushed commits would be stranded behind the release.
unpushed="$(git rev-list --count "origin/$BRANCH..HEAD" 2>/dev/null || echo 0)"
if [ "${unpushed:-0}" -gt 0 ]; then
  echo "You have $unpushed commit(s) that are not on GitHub yet. Push them first:" >&2
  echo "    git push origin $BRANCH" >&2
  exit 1
fi

tmp="$(mktemp)"
sed \
  -e "s|^HOLDER:.*|HOLDER: none|" \
  -e "s|^SINCE:.*|SINCE: -|" \
  -e "s|^DOING:.*|DOING: -|" \
  "$BATON_FILE" > "$tmp"
mv "$tmp" "$BATON_FILE"

git add "$BATON_FILE"
git commit --quiet -m "chore: $me finished, site is free"
git push --quiet origin "$BRANCH"

echo
echo "Baton released. The other person can work now."
echo
