#!/usr/bin/env bash
#
# One-time setup after cloning. Safe to run again at any point.
#
#   bash scripts/setup.sh

set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

echo
echo "Setting up the Jayburtt Dijkhoff site"
echo "====================================="
echo

# ---------------------------------------------------------------------------
# 1. Dependencies
# ---------------------------------------------------------------------------

echo "Installing dependencies..."
npm install --silent
echo "  done"
echo

# ---------------------------------------------------------------------------
# 2. Turn on the pre-push hook
#
# Git does not track .git/hooks, so the hook lives in .githooks and this points
# Git at it. Without this line the baton is documentation only.
# ---------------------------------------------------------------------------

git config core.hooksPath .githooks
chmod +x .githooks/* scripts/*.sh 2>/dev/null || true
echo "Push protection enabled."
echo

# ---------------------------------------------------------------------------
# 3. Who are you?
#
# Deliberately not git user.email: commits on this project are authored under a
# shared identity so the deploys keep working, so the email cannot tell two
# collaborators apart. This handle can.
# ---------------------------------------------------------------------------

existing="$(git config --get collab.who || true)"

if [ -n "$existing" ]; then
  echo "You are already set up as: $existing"
  printf "Keep this? [Y/n] "
  read -r keep
  case "${keep:-y}" in
    [Nn]*) existing="" ;;
    *) ;;
  esac
fi

if [ -z "$existing" ]; then
  echo "Pick a short handle, lowercase, no spaces. For example: nevin, jayburtt"
  printf "Your handle: "
  read -r handle
  handle="$(echo "$handle" | tr '[:upper:]' '[:lower:]' | tr -cd '[:alnum:]._-')"
  if [ -z "$handle" ]; then
    echo "No handle given. Run this again when you are ready." >&2
    exit 1
  fi
  git config collab.who "$handle"
  echo "  set to: $handle"
fi

echo

# ---------------------------------------------------------------------------
# 4. Local environment file
# ---------------------------------------------------------------------------

if [ ! -f .env.local ] && [ -f .env.example ]; then
  cp .env.example .env.local
  echo "Created .env.local from .env.example."
  echo "Fill in the values before the forms or the admin page will work locally."
  echo
fi

cat <<'EOF'
Setup complete.

  Start the site:      npm run dev
  Before you work:     bash scripts/claim.sh "what you are doing"
  When you finish:     bash scripts/release.sh

Read COLLABORATION.md once before your first push.

EOF
