# Windows Hook Fixes for Claude Code Plugins

## Problem

On Windows, Claude Code doesn't properly set or expand the `${CLAUDE_PLUGIN_ROOT}` environment variable when executing plugin hooks. This causes `SessionStart` and `Stop` hooks to fail with errors like:

- `SessionStart:startup hook error`
- `Stop:hook error`

**Root Cause:** The `${CLAUDE_PLUGIN_ROOT}` variable expands to Windows-style paths with backslashes (`C:\Users\...`) which bash doesn't interpret correctly, or the variable is not set at all.

## Affected Plugins

| Plugin | Hooks Affected | Version |
|--------|----------------|---------|
| superpowers | SessionStart | 4.1.1 |
| explanatory-output-style | SessionStart | 27d2b86d72da |
| learning-output-style | SessionStart | 27d2b86d72da |
| hookify | PreToolUse, PostToolUse, Stop, UserPromptSubmit | 27d2b86d72da |
| ralph-loop | Stop | 27d2b86d72da |

## Working Solution: .cmd Wrapper Files

The most reliable fix for Windows is to create `.cmd` batch files that call the bash scripts with proper path handling.

### 1. superpowers - SessionStart Hook

**Already had wrapper:** `session-start-hook.cmd` (exists)

Location: `C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/superpowers/4.1.1/hooks/session-start-hook.cmd`

```cmd
@echo off
REM Windows wrapper for superpowers SessionStart hook
REM This wrapper ensures paths work correctly on Windows

setlocal

set "SCRIPT_DIR=%~dp0"
set "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

pushd "%SCRIPT_DIR%\.."
set "PLUGIN_ROOT=%CD%"
popd

"C:\Program Files\Git\bin\bash.exe" -l "%PLUGIN_ROOT%\hooks\session-start.sh"

endlocal
```

**Modified:** `hooks/hooks.json`

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume|clear|compact",
        "hooks": [
          {
            "type": "command",
            "command": "C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/superpowers/4.1.1/hooks/session-start-hook.cmd"
          }
        ]
      }
    ]
  }
}
```

### 2. explanatory-output-style - SessionStart Hook

**Created wrapper:** `session-start-hook.cmd`

Location: `C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/explanatory-output-style/27d2b86d72da/hooks/session-start-hook.cmd`

```cmd
@echo off
setlocal

set "HOOK_DIR=%~dp0"
set "HOOK_DIR=%HOOK_DIR:~0,-1%"

pushd "%HOOK_DIR%\.."
set "PLUGIN_ROOT=%CD%"
popd

"C:\Program Files\Git\usr\bin\bash.exe" "%PLUGIN_ROOT%\hooks-handlers\session-start.sh"

endlocal
```

**Modified:** `hooks/hooks.json`

```json
{
  "description": "Explanatory mode hook that adds educational insights instructions",
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/explanatory-output-style/27d2b86d72da/hooks/session-start-hook.cmd"
          }
        ]
      }
    ]
  }
}
```

### 3. learning-output-style - SessionStart Hook

**Created wrapper:** `session-start-hook.cmd`

Location: `C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/learning-output-style/27d2b86d72da/hooks/session-start-hook.cmd`

```cmd
@echo off
setlocal

set "HOOK_DIR=%~dp0"
set "HOOK_DIR=%HOOK_DIR:~0,-1%"

pushd "%HOOK_DIR%\.."
set "PLUGIN_ROOT=%CD%"
popd

"C:\Program Files\Git\usr\bin\bash.exe" "%PLUGIN_ROOT%\hooks-handlers\session-start.sh"

endlocal
```

**Modified:** `hooks/hooks.json`

```json
{
  "description": "Learning mode hook that adds interactive learning instructions",
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/learning-output-style/27d2b86d72da/hooks/session-start-hook.cmd"
          }
        ]
      }
    ]
  }
}
```

### 4. hookify - All Hooks

**Modified:** `C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/hookify/27d2b86d72da/hooks/hooks.json`

Replace all `${CLAUDE_PLUGIN_ROOT}` with absolute paths:

```json
{
  "description": "Hookify plugin - User-configurable hooks from .local.md files",
  "hooks": {
    "PreToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/hookify/27d2b86d72da/hooks/pretooluse.py",
            "timeout": 10
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/hookify/27d2b86d72da/hooks/posttooluse.py",
            "timeout": 10
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/hookify/27d2b86d72da/hooks/stop.py",
            "timeout": 10
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/hookify/27d2b86d72da/hooks/userpromptsubmit.py",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

### 5. ralph-loop - Stop Hook

**Modified:** `C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/ralph-loop/27d2b86d72da/hooks/hooks.json`

```json
{
  "description": "Ralph Loop plugin stop hook for self-referential loops",
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash C:/Users/Suren/.claude/plugins/cache/claude-plugins-official/ralph-loop/27d2b86d72da/hooks/stop-hook.sh"
          }
        ]
      }
    ]
  }
}
```

## Why .cmd Files Work on Windows

1. **Native execution**: `.cmd` files are executed directly by Windows without needing shell detection
2. **Path handling**: Batch files handle Windows paths natively with `%~dp0` for the script directory
3. **Bash invocation**: The `.cmd` file explicitly calls bash with the full path to Git's bash.exe
4. **Reliable**: Avoids issues with path separators, environment variable expansion, and shell detection

## Reapplying Fixes After Plugin Updates

When you update a plugin, you'll need to reapply these fixes. The plugin version/hash in the path may change.

### Steps:

1. **Find the new plugin path:**
   ```bash
   ls -la ~/.claude/plugins/cache/claude-plugins-official/superpowers/
   ```

2. **For SessionStart hooks (superpowers, explanatory-output-style, learning-output-style):**
   - Create/update the `session-start-hook.cmd` in the `hooks/` directory
   - Update `hooks/hooks.json` with the new path to the `.cmd` file

3. **For hookify and ralph-loop:**
   - Edit `hooks/hooks.json` and replace `${CLAUDE_PLUGIN_ROOT}` with absolute paths

## Quick Reapply Script

Save this as `fix-hooks.cmd` and run it after plugin updates:

```cmd
@echo off
setlocal

REM Find plugin paths (adjust as needed for your system)
set "CLAUDE_PLUGIN_ROOT=C:\Users\Suren\.claude\plugins\cache\claude-plugins-official"

REM Create superpowers wrapper (if not exists)
set "SUPERPOWERS=%CLAUDE_PLUGIN_ROOT%\superpowers\4.1.1"
(
echo @echo off
echo setlocal
echo.
echo set "SCRIPT_DIR=%%~dp0"
echo set "SCRIPT_DIR=%%SCRIPT_DIR:~0,-1%%"
echo.
echo pushd "%%SCRIPT_DIR%%\.."
echo set "PLUGIN_ROOT=%%CD%%"
echo popd
echo.
echo "C:\Program Files\Git\bin\bash.exe" -l "%%PLUGIN_ROOT%%\hooks\session-start.sh"
echo.
echo endlocal
) > "%SUPERPOWERS%\hooks\session-start-hook.cmd"

REM Create explanatory-output-style wrapper
set "EXPLANATORY=%CLAUDE_PLUGIN_ROOT%\explanatory-output-style\27d2b86d72da"
(
echo @echo off
echo setlocal
echo.
echo set "HOOK_DIR=%%~dp0"
echo set "HOOK_DIR=%%HOOK_DIR:~0,-1%%"
echo.
echo pushd "%%HOOK_DIR%%\.."
echo set "PLUGIN_ROOT=%%CD%%"
echo popd
echo.
echo "C:\Program Files\Git\usr\bin\bash.exe" "%%PLUGIN_ROOT%%\hooks-handlers\session-start.sh"
echo.
echo endlocal
) > "%EXPLANATORY%\hooks\session-start-hook.cmd"

REM Create learning-output-style wrapper
set "LEARNING=%CLAUDE_PLUGIN_ROOT%\learning-output-style\27d2b86d72da"
(
echo @echo off
echo setlocal
echo.
echo set "HOOK_DIR=%%~dp0"
echo set "HOOK_DIR=%%HOOK_DIR:~0,-1%%"
echo.
echo pushd "%%HOOK_DIR%%\.."
echo set "PLUGIN_ROOT=%%CD%%"
echo popd
echo.
echo "C:\Program Files\Git\usr\bin\bash.exe" "%%PLUGIN_ROOT%%\hooks-handlers\session-start.sh"
echo.
echo endlocal
) > "%LEARNING%\hooks\session-start-hook.cmd"

echo Hooks fixed for Windows!
endlocal
```

## Related Issues

- GitHub Issue: [anthropics/claude-code#16451](https://github.com/anthropics/claude-code/issues/16451) - Plugin hooks fail on Windows with spaces in username
- GitHub Issue: [anthropics/claude-code#18851](https://github.com/anthropics/claude-code/issues/18851) - Plugin bash hooks fail on Windows due to mixed path separators

## Last Applied

- Date: 2026-01-31 (final fix using .cmd wrapper files)
- Claude Code Version: 2.1.27
- Platform: Windows (Git Bash)
