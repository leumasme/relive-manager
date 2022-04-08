# relive-manager

This was supposed to be a tool to manage AMD Radeon ReLive replays.
The GUI is built with sciter-js, which is a very lightweight html/css/js engine, a bit like electron.
After much pain, however, building this with sciter was not a good idea.
Although it has some nice CSS features, sciter is sadly lacking whenever you dive too deep into any specific aspect, where many bugs and issues will quickly reveal themselves.
The documentation is inconsistent and incomplete, and the only way of solving many issues is creating a forum thread and *hoping* that the developer will answer.

Maybe i will continue work on this someday, maybe i will remake it in electron or something similar.

### Latest issues:
- [] Video uses system installed decoder, if no usable decoders are found, the video will simply not display. Seemingly no events or anything to detect this
- [] The video element lacks functionality and takes very long to seek arround in the video
- [x] Horizontal slider elements will expand infinitely when dragged to the end [Workarround found]
- [] The Inspector often freezes, for example whenever null or undefined is logged. My forum thread about this was ignored.