#!/usr/bin/env bash
#
# Claims the baton: makes you the only person allowed to push to main.
#
#   bash scripts/claim.sh "rewriting the about page"
#   bash scripts/claim.sh "taking over, Nevin unreachable" --force
#
# See COLLABORATION.md.

set -euo pipefail

BATON_FILE="ACTIVE-WORK.md"
BRANCH="main"

cd "$(git rev-parse --show-toplevel)"

reason=""
force=0
for arg in "$@"; do
  case "$arg" in
    --force) force=1 ;;
    *) reason="$arg" ;;
  esac
done

if [ -z "$reason" ]; then
  echo "Say what you are about to work on:" >&2
  echo "    bash scripts/claim.sh \"rewriting the about page\"" >&2
  exit 1
fi

me="$(git config --get collab.who || true)"
if [ -z "$me" ]; then
  echo "This repository does not know who you are yet. Run: bash scripts/setup.sh" >&2
  exit 1
fi

# Start from whatever is live, not from whatever is on this laptop.
echo "Getting the latest from GitHub..."
git checkout --quiet "$BRANCH"
git pull --rebase --quiet origin "$BRANCH"

holder="$(grep -m1 '^HOLDER:' "$BATON_FILE" | sed 's/^HOLDER:[[:space:]]*//' | tr -d '[:space:]')"
since="$(grep -m1 '^SINCE:'  "$BATON_FILE" | sed 's/^SINCE:[[:space:]]*//'  | tr -d '[:space:]')"
doing="$(grep -m1 '^DOING:'  "$BATON_FILE" | sed 's/^DOING:[[:space:]]*//')"

if [ "$holder" = "$me" ]; then
  echo "You already hold the baton (since $since). Carry on."
  exit 0
fi

if [ "$holder" != "none" ] && [ "$force" -eq 0 ]; then
  cat >&2 <<EOF

$holder holds the baton.

  Since:  $since
  Doing:  $doing

Message them and wait. If they are genuinely unreachable:

    bash scripts/claim.sh "$reason" --force

EOF
  exit 1
fi

if [ "$holder" != "none" ]; then
  echo "Taking the baton from $holder."
fi

now="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

# Rewrite only the three machine-read lines; leave the prose above them alone.
tmp="$(mktemp)"
sed \
  -e "s|^HOLDER:.*|HOLDER: $me|" \
  -e "s|^SINCE:.*|SINCE: $now|" \
  -e "s|^DOING:.*|DOING: $reason|" \
  "$BATON_FILE" > "$tmp"
mv "$tmp" "$BATON_FILE"

git add "$BATON_FILE"
git commit --quiet -m "chore: $me is working on the site ($reason)"

# If this push is rejected, someone claimed in the same moment. Their push won.
if ! git push --quiet origin "$BRANCH"; then
  git reset --hard --quiet HEAD~1
  cat >&2 <<'EOF'

Somebody claimed the baton at the same moment and got there first.
Your claim was undone, nothing is lost. Run the command again to see who has it.

EOF
  exit 1
fi

echo
echo "You hold the baton. Run 'bash scripts/release.sh' when you are done."
echo
