# dfn

Minimalist Toy AMD loader.

This has no great intention of being a full-featured [AMD loader][], but is more aimed at trying to get a [requirejs][]-like functionality that could fit in a tweet.

This currently requires that this script be loaded into the page first, so that the `rqr()` function is available, and that any Functions/Objects being loaded are already in the page before they can included with `dfn`.

In theory, this would work best if all js files are concatenated, with this file in first, and the final require script at the end.

---

Inspired by other minimalist js projects:
- [140byt.es](http://140byt.es/)
- [when-then by geuis](https://github.com/geuis/when-then)


[AMD loader][https://github.com/amdjs/amdjs-api]
[requirejs][http://requirejs.org/]
