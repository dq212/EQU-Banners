<!DOCTYPE html>
<html>

<head>
    <title>EQU_FP23-CONSIDERATION_PR_TTD_BANNER___DEFY-STRESS_LM_160X600_</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="ad.size" content="width=160,height=600" />
    <link type="text/css" rel="stylesheet" media="screen, projection" href="css/styles.css" />
</head>

<body>
    <div id="wrapper">



        <!-- start adding banner elements below this line-->
        <div id="bg"></div>
        <div id="bg-color"></div>

        <div id="click_through"></div>

        <div id="athena"><img src="../img/athena@2x.png" alt="" /></div>

        <div id="blue-2"><img src="../img/blue-2@2x.png" alt="" /></div>
        <div id="blue-3"><img src="../img/blue-3@2x.png" alt="" /></div>
        <div id="blue-1"><img src="../img/blue-1@2x.png" alt="" /></div>

        <div id="copy-1"><img src="../img/copy-1@2x.png" alt="" /></div>
        <div id="copy-2"><img src="../img/copy-2@2x.png" alt="" /></div>
        <div id="copy-3"><img src="../img/copy-3@2x.png" alt="" /></div>
        <div id="copy-4"><img src="../img/copy-4@2x.png" alt="" /></div>



        <div id="logo"><img src="../img/logo@2x.png" alt="" /></div>
        <div id="logo-blue"><img src="../img/logo_blue@2x.png" alt="" /></div>
        <div id="cta">
            <img src="../img/cta@2x.png" alt="" />
        </div>

        <div id="btn_disclosure"><img src="../img/btn_disclosure@2x.png" alt="" /></div>
        <div id="legal"><img src="../img/legal@2x.png" alt="" /></div>
        <div id="code"><img src="../img/code@2x.png" alt="" /></div>

        <div id="disclosure">
            <div id="logo2"><img src="../img/logo@2x.png" alt="" /></div>
            <div id="disclosure_txt"><img src="../img/disclosure@2x.png" alt="" /></div>
            <div id="close"><img src="../img/close@2x.png" alt="" /></div>
        </div>


    </div>
    <!--START OF IMAGES -->

    <!--END OF IMAGES -->

    <script type="text/javascript" src="https://s0.2mdn.net/ads/studio/cached_libs/tweenmax_1.18.0_499ba64a23378545748ff12d372e59e9_min.js"></script>
    <script type="text/javascript" src="js/O2KL.js"></script>
    <script type="text/javascript" src="js/IEfallback.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript">
        var clickTag = "https://www.google.com";

        window.onload = function() {
            O2KL.init();
        };
    </script>
</body>

</html>
    img src = "../img/cta@2x.png"
alt = "" / >
    <
    /div>

<
div id = "btn_disclosure" > < img src = "../img/btn_disclosure@2x.png"
alt = "" / > < /div> <
    div id = "legal" > < img src = "../img/legal@2x.png"
alt = "" / > < /div> <
    div id = "code" > < img src = "../img/code@2x.png"
alt = "" / > < /div>

<
div id = "disclosure" >
    <
    div id = "logo2" > < img src = "../img/logo@2x.png"
alt = "" / > < /div> <
    div id = "disclosure_txt" > < img src = "../img/disclosure@2x.png"
alt = "" / > < /div> <
    div id = "close" > < img src = "../img/close@2x.png"
alt = "" / > < /div> <
    /div>


<
/div>
<!--START OF IMAGES -->

<!--END OF IMAGES -->

<
script type = "text/javascript"
src = "https://s0.2mdn.net/ads/studio/cached_libs/tweenmax_1.18.0_499ba64a23378545748ff12d372e59e9_min.js" > < /script> <
    script type = "text/javascript"
src = "js/O2KL.js" > < /script> <
    script type = "text/javascript"
src = "js/IEfallback.js" > < /script> <
    script type = "text/javascript"
src = "js/index.js" > < /script> <
    script type = "text/javascript" >
    var clickTag = "https://www.google.com";

window.onload = function() {
O2KL.init();
}; <
/script> <
/body>

<
/html>         message: "One or more tests failed, see cli for details.",
})
);
});

gulp.task("connect", ["sass"], function() {
    connect.server({
        root: baseURL,
        livereload: true,
        port: port,
    });
});

gulp.task("open", ["connect"], function() {
    var options = {
        uri: uri,
        app: os.platform() === "darwin" ? "google chrome" : "chrome",
    };
    gulp.src("./").pipe(open(options));
});

gulp.task("html", function() {
    gulp.src(src + "/*.html").pipe(connect.reload());
});

(function(tasks) {
    tasks.forEach(function(task) {
        gulp.task("sass" + task.append, function(done) {
            gulp
                .src("./sass/*.scss")
                .pipe(
                    plumber({
                        errorHandler: function(error) {
                            console.log(error.message);
                            this.emit("end");
                        },
                    })
                )
                .pipe(
                    compass({
                        css: src + "/css",
                        sass: "./sass",
                        image: src + "/",
                        style: "nested",
                        generated_images_path: src + "/img",
                        force: task.force,
                    })
                )
                .on("error", function(error) {
                    console.log(error.message);
                })
                .pipe(replace("sprites/", ""))
                .pipe(gulp.dest(src + "/css"))
                .pipe(connect.reload())
                .on("end", function() {
                    done();
                });
        });

        gulp.task(
            "moveGeneratedImages" + task.append, ["sass" + task.append],
            function() {
                return gulp
                    .src(src + "/img/sprites/**/*.png")
                    .pipe(gulp.dest(src + "/img"));
            }
        );

        gulp.task(
            "cleanSprites" + task.append, ["moveGeneratedImages" + task.append],
            function() {
                return del(src + "/img/sprites");
            }
        );
    });
})([
    { append: "", force: false },
    { append: "Force", force: true },
]);

gulp.task("lint", function() {
    return gulp
        .src(src + "/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(connect.reload());
});

gulp.task("watch", function() {
    gulp.watch([src + "/*.html"], ["html"]);
    gulp.watch(
        ["./sass/*.scss"], ["sass", "moveGeneratedImages", "cleanSprites"]
    );
    gulp.watch([src + "/js/*.js"], ["lint"]);
    gulp.watch(
        ["src/sprites/**/*"], ["sassForce", "moveGeneratedImagesForce", "cleanSpritesForce"]
    );
});

gulp.task("clean", function() {
    return gulp.src([dist + "/**/*"], { read: false }).pipe(clean());
});

gulp.task("copy", ["clean", "cleanSprites"], function() {
    return gulp
        .src([
            src + "/*.{gif,jpg,png}",
            src + "/img/**/*.{gif,png,gif,svg}",
            src + "/manifest.js",
        ])
        .pipe(copy(dist, { prefix: 2 }));
});

gulp.task("copyStatic", function() {
    gulp
        .src("./src/img/static.gif")
        .pipe(rename("EQU_FP23-CONSIDERATION_PR_TTD_BANNER___DEFY-STRESS_LM_970x250__STATIC.gif"))
        .pipe(gulp.dest("../STATICS/"));
});


gulp.task("inline", ["sass"], function(done) {
    gulp
        .src(src + "/index.html")
        .pipe(
            inline({
                base: src,
                js: uglify,
                css: minifyCSS,
                disabledTypes: ["img"],
            })
        )
        .pipe(gulp.dest(dist))
        .on("end", function() {
            done();
        });
});

gulp.task("replace", ["inline"], function(done) {
    gulp
        .src([dist + "/index.html"])
        .pipe(replace("../img/", "img/"))
        .pipe(replace("img/", "./"))
        .pipe(gulp.dest(dist))
        .on("end", function() {
            done();
        });
});

gulp.task("htmlmin", ["replace"], function() {
    return gulp
        .src(dist + "/index.html")
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest(dist));
});

gulp.task("imageCompress", ["copy", "sass"], function(done) {
    gulp
        .src([dist + "/*.{gif,png,svg,gif}"].concat(uncompressedImgs))
        .pipe(
            image({
                pngquant: true,
                optipng: false,
                zopflipng: false,
                jpegRecompress: true,
                jpegoptim: false,
                mozjpeg: false,
                gifsicle: true,
                svgo: true,
                concurrent: 10,
            })
        )
        .pipe(gulp.dest(dist))
        .on("end", function() {
            done();
        });
});

gulp.task(
    "compress", ["clean", "copy", "sass", "inline", "replace", "htmlmin", "imageCompress"],
    function() {
        return gulp
            .src(dist + "/*")
            .pipe(zip("EQU_FP23-CONSIDERATION_PR_TTD_BANNER___DEFY-STRESS_LM_970X250_.zip"))
            .pipe(gulp.dest("../HTML/"));
    }
);