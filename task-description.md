## Problem statement
You need to build a “vs-code like” file explorer tree view with multiple collapsible sections. The
program needs to take as an argument one or multiple paths to local directories. Each directory
needs to be represented as an independent section in the rendered file explorer. When a file on
the host is deleted, added, removed or renamed within one of the specified directories, changes
should be reflected in the rendered file explorer.
The file explorer component should be rendered in a web browser.  You are allowed to use any
library you want
#### Example usage:
node ./file-explorer.js ~/Desktop/ ./an/index-dir/
