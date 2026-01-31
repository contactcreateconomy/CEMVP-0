#!/usr/bin/env bash
# Fix Windows Claude Code plugin hooks
# Run this after updating plugins to reapply Windows path fixes

set -euo pipefail

echo "Fixing Windows plugin hooks..."

# Find current plugin versions
SUPERPOWERS_PATH=$(find ~/.claude/plugins/cache -type d -name "superpowers" 2>/dev/null | head -1)
HOOKIFY_PATH=$(find ~/.claude/plugins/cache -type d -name "hookify" 2>/dev/null | head -1)
RALPH_PATH=$(find ~/.claude/plugins/cache -type d -name "ralph-loop" 2>/dev/null | head -1)

# Convert Windows paths if needed
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    SUPERPOWERS_PATH=$(cygpath -u "$SUPERPOWERS_PATH" 2>/dev/null || echo "$SUPERPOWERS_PATH")
    HOOKIFY_PATH=$(cygpath -u "$HOOKIFY_PATH" 2>/dev/null || echo "$HOOKIFY_PATH")
    RALPH_PATH=$(cygpath -u "$RALPH_PATH" 2>/dev/null || echo "$RALPH_PATH")
fi

echo "Found plugin paths:"
echo "  superpowers: $SUPERPOWERS_PATH"
echo "  hookify:     $HOOKIFY_PATH"
echo "  ralph-loop:  $RALPH_PATH"

# Fix superpowers
if [ -n "$SUPERPOWERS_PATH" ]; then
    echo "Fixing superpowers..."

    # Create wrapper script
    cat > "$SUPERPOWERS_PATH/hooks/run-session-start.sh" << 'WRAPPER_EOF'
#!/usr/bin/env bash
# Wrapper that ensures CLAUDE_PLUGIN_ROOT is properly set
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export CLAUDE_PLUGIN_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
exec "${CLAUDE_PLUGIN_ROOT}/hooks/session-start.sh"
WRAPPER_EOF

    chmod +x "$SUPERPOWERS_PATH/hooks/run-session-start.sh"

    # Update hooks.json with Windows path
    WIN_PATH=$(cygpath -w "$SUPERPOWERS_PATH" 2>/dev/null || echo "$SUPERPOWERS_PATH")
    WIN_PATH="${WIN_PATH//\\/\\/}"

    # Use sed to replace the command
    sed -i 's|"command": "\${CLAUDE_PLUGIN_ROOT}/hooks/session-start.sh"|"command": "bash \"'"$WIN_PATH"'/hooks/run-session-start.sh\""|g' "$SUPERPOWERS_PATH/hooks/hooks.json"

    echo "  superpowers fixed!"
fi

# Fix hookify
if [ -n "$HOOKIFY_PATH" ]; then
    echo "Fixing hookify..."

    WIN_PATH=$(cygpath -w "$HOOKIFY_PATH" 2>/dev/null || echo "$HOOKIFY_PATH")
    WIN_PATH="${WIN_PATH//\\/\\/}"

    sed -i 's|python3 \${CLAUDE_PLUGIN_ROOT}/hooks/|python3 '"$WIN_PATH"'/hooks/|g' "$HOOKIFY_PATH/hooks/hooks.json"

    echo "  hookify fixed!"
fi

# Fix ralph-loop
if [ -n "$RALPH_PATH" ]; then
    echo "Fixing ralph-loop..."

    WIN_PATH=$(cygpath -w "$RALPH_PATH" 2>/dev/null || echo "$RALPH_PATH")
    WIN_PATH="${WIN_PATH//\\/\\/}"

    sed -i 's|"command": "\${CLAUDE_PLUGIN_ROOT}/hooks/stop-hook.sh"|"command": "bash '"$WIN_PATH"'/hooks/stop-hook.sh"|g' "$RALPH_PATH/hooks/hooks.json"

    echo "  ralph-loop fixed!"
fi

echo ""
echo "All Windows plugin hooks have been fixed!"
echo "Restart Claude Code to apply changes."
