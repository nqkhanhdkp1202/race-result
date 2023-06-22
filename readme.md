Size Limit Cult Of Martians
Size Limit logo by Anton Lovchikov

Size Limit is a performance budget tool for JavaScript. It checks every commit on CI, calculates the real cost of your JS for end-users and throws an error if the cost exceeds the limit.

ES modules and tree-shaking support.
Add Size Limit to Travis CI, Circle CI, GitHub Actions or another CI system to know if a pull request adds a massive dependency.
Modular to fit different use cases: big JS applications that use their own bundler or small npm libraries with many files.
Can calculate the time it would take a browser to download and execute your JS. Time is a much more accurate and understandable metric compared to the size in bytes.
Calculations include all dependencies and polyfills used in your JS.
Size Limit CLI

With GitHub action Size Limit will post bundle size changes as a comment in pull request discussion.

Size Limit comment in pull request about bundle size changes

With --why, Size Limit can tell you why your library is of this size and show the real cost of all your internal dependencies. We are using Statoscope for this analysis.

Statoscope example

Sponsored by Evil Martians

Who Uses Size Limit
MobX
Material-UI
Autoprefixer
PostCSS reduced 25% of the size.
Browserslist reduced 25% of the size.
EmojiMart reduced 20% of the size
nanoid reduced 33% of the size.
React Focus Lock reduced 32% of the size.
Logux reduced 90% of the size.
How It Works
Size Limit contains a CLI tool, 3 plugins (file, webpack, time) and 3 plugin presets for popular use cases (app, big-lib, small-lib). A CLI tool finds plugins in package.json and loads the config.
If you use the webpack plugin, Size Limit will bundle your JS files into a single file. It is important to track dependencies and webpack polyfills. It is also useful for small libraries with many small files and without a bundler.
The webpack plugin creates an empty webpack project, adds your library and looks for the bundle size difference.
The time plugin compares the current machine performance with that of a low-priced Android devices to calculate the CPU throttling rate.
Then the time plugin runs headless Chrome (or desktop Chrome if it’s available) to track the time a browser takes to compile and execute your JS. Note that these measurements depend on available resources and might be unstable. See here for more details.
Usage
JS Applications
Suitable for applications that have their own bundler and send the JS bundle directly to a client (without publishing it to npm). Think of a user-facing app or website, like an email client, a CRM, a landing page or a blog with interactive elements, using React/Vue/Svelte lib or vanilla JS.

Show instructions
JS Application and Time-based Limit
File size limit (in kB) is not the best way to describe your JS application cost for developers. Developers will compare the size of the JS bundle with the size of images. But browsers need much more time to parse 100 kB of JS than 100 kB of an image since JS compilers are very complex.

This is why Size Limit support time-based limit. It runs headless Chrome to track the time a browser takes to compile and execute your JS.

Show instructions
Big Libraries
JS libraries > 10 kB in size.

This preset includes headless Chrome, and will measure your lib’s execution time. You likely don’t need this overhead for a small 2 kB lib, but for larger ones the execution time is a more accurate and understandable metric that the size in bytes. Libraries like React are good examples for this preset.

Show instructions
Small Libraries
JS libraries < 10 kB in size.

This preset will only measure the size, without the execution time, so it’s suitable for small libraries. If your library is larger, you likely want the Big Libraries preset above. Nano ID or Storeon are good examples for this preset.

Show instructions
Reports
Size Limit has a GitHub action that comments and rejects pull requests based on Size Limit output.

Install and configure Size Limit as shown above.
Add the following action inside .github/workflows/size-limit.yml