// Create Separate CSS Files.

// 0. I copied the chapter 133 files into chapter 134 folder, including the .git repo.
// 1. I ran, yarn install, in the chapter folder, to get the node_modules folder and yarn.lock file built.

// In this video we are going to separate out our css files.
// 0. If we look at the html file that is being displayed on the webpage, we will see <style> tags within this
//    file. There is a <style> tag for normalize.css, which is meant to normalize the styling of elements across
//    browsers, and which we installed in to package.json, and then had imported in to app.js. There is a <style>
//    tag for my styles.scss that I defined, which imports _base.scss and _settings.scss, and which itself is 
//    imported in app.js. Last, there is a <style> tag for the DateRangePicker object that we imported to define
//    our date selector. So, all the css is clubbed into the html file. What we would rather have is that we simply
//    link to a file that defines the styles in a separate file: <link rel = stylesheet href = ./style.css>, and
//    where the style.css file is the file that contains our css and is placed in the same directory as our index.html.
// 1. Aside, before we move on, I want to revisit what webpack is doing with css files prior to introducing the new
//    plugin we discuss below. The webpack code that specified: {test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader']},
//    essentially tests for files that end in scss, and runs the sass loader first, which converts the scss to a css file, 
//    then the css-loader is run on the output of sass-loader and it reads the css file as a string and resolves the import
//    dependencies (eg: normalize.css is imported in app.js, and so this tells Webpack to include the normalize.css file in
//    bundle.js), and last the style-loader is run on the output of the css-loader and it creates the <style> tags we discussed
//    above, within the index.html file. 
// 2. Aside again, what is the difference between css, scss and sass. First, Sass has two syntaxes. The most commonly used
//    syntax is the SCSS (Sassy CSS) and it is a superset of CSS3. This means every CSS stylesheet is also valid SCSS.
//    SCSS files use the .scss extension. So, both CSS and SCSS use semicolons and brackets. SCSS allows the use of variables,
//    used with a $ sign preceeding the variable. In both CSS and SCSS, semicolons can be used to separate declarations and so
//    we can have multiple declarations in one single line (eg: .border {padding: $margin / 2; margin: $margin / 2; 
//    border-color: $blue;}). The less commonly used Sass syntax, also the older syntax, is known as the indented syntax 
//    (or just .sass). Instead of brackets and semicolons, it used indentations of lines to specify blocks. So, we cannot put
//    the declarations on a single line. See https://responsivedesign.is/articles/difference-between-sass-and-scss/. Note, ofcourse
//    this less commonly used syntax also supports variables, used with a $ sign preceeding the variable.
// 3. Now, rather than creating the <style> tags within index.html, we shall simply separate out the css content into a file,
//    and link to this file within index.html. Once we do this, our styles will no longer be inlined into the JS bundle, but will
//    be in a separate CSS file (styles.css)
//    0. First we install extract-text-webpack-plugin. This plugin will extract the css text from bundle.js and put it into
//       a separate file: yarn add extract-text-webpack-plugin.
//    1. We import this package in webpack.config.sys, using require, since this is a npm module.
//    2. We create an instance of the imported plugin and this takes the file name where we put our css that is extracted
//       from bundle.js
//    3. We change the use property that was loading different loaders. CSSExtract.extract() creates an extracting loader from
//       existing loaders. And the existing loaders which we shall use are css-loader and sass-loader. Note, we do not use
//       style-loader, since it was inlining the css into our bundle.js and hence index.html, whereas we want to extract it and
//       put this css into styles.css file. Also note, we pass the existing loaders into the constructor function as a use property
//       of an object.
//    4. We add plugins array and pass the CSSExtract into this array.
//    5. I ran the code with this new plugin, and got an error: Tapable.plugin is deprecated. Use new API on `.hooks` instead. On
//       investigation, I learned that I needed to use mini-css-extract-plugin, instead of, extract-text-webpack-plugin. With 
//       webpack 4.0, this is the recommended plugin. So, I used this now instead. I installed it: yarn add mini-css-extract-plugin.
//       See webpack.config.sys, for how it was used. When I ran: yarn run build:prod, I see that I get two additional files: 
//       styles.css and styles.css.map. I also see that the styling is all messed up in the pages served, and this is because 
//       the inline <style> tags have been eliminated (since we did not load style-loader), as desired, but we did not create a 
//       <link> tag to link in the styles.css file. We shall do this below. Note, I had to use 'filename:' in webpack.config.js 
//       when I created an instance of MiniCSSExtractPlugin.
//    6. I created a <link rel = "stylesheet" type = "text/css" href = "styles.css"/> tag in the index.html file in the public 
//       folder. I ran: yarn run build:prod, and then ran: yarn run serve. Now, I see that not only do I not have the inline
//       <style> tags, but I also have my styling correctly laid out.
//    7. If we study the datepicker element in the console, we see that the css line numbers point to the datepicker:css file.
//       We want to see the line numbers from the original source. However, if we run the dev build: yarn run build:dev and then
//       run: yarn run serve, we find that for the datepicker element now, we do not see the original file, but see everything
//       point to styles.css. This is not very helpful whiledebugging, since we want to point to the original source. For this
//       we need to make a few changes.
//    8. The changes we make are as follows: We add: options: {sourceMap: true}, as see in webpack.config.js. And we had to use 
//        inline-source-maps.
//    9. Now, when we run: yarn run build:dev, and, yarn add serve, we see the correct line numbers in the original css source
//       files.
//
