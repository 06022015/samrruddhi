(function (e) {
    var t = {effect:"scroll", autoplay:true, feedType:"none", linkTarget:"_blank", feedCount:5, refresh:"10:00"};
    var n = {scroll:{scrollType:"continuous", scrollStart:"inside", scrollInterval:20, transitionTime:500}, fade:{displayTime:4e3, transitionTime:300}, type:{typeInterval:10, displayTime:4e3, transitionTime:300}, slide:{slideDistance:100, displayTime:4e3, transitionTime:350}};
    var r = {"rss-atom":{feedUrl:"", loadType:"direct"}, twitter:{twitterName:"", twitterLoadingFile:"modern-ticker/php/twitter.php"}};
    var i = {init:function (t) {
        var i = {};
        e.extend(i, {feedType:t.feedType});
        e.extend(i, r[i.feedType]);
        e.extend(i, {effect:t.effect});
        e.extend(i, n[i.effect]);
        e.extend(i, t);
        return this.each(function () {
            function T() {
                var e = p.width();
                if (d.length)e -= d.outerWidth(true);
                if (y.length)e -= y.outerWidth(true);
                v.css("width", e);
                n = e
            }

            function N() {
                t = 0;
                m.children().each(function () {
                    t += e(this).outerWidth(true) + 1
                });
                m.css("width", t)
            }

            function C() {
                B();
                m.addClass("mt-hide");
                v.addClass("mt-preloader");
                m.children().remove();
                m.css("margin-left", 0);
                g.css("opacity", "1").removeClass("mt-hide");
                m.append(g);
                switch (i.feedType) {
                    case"rss-atom":
                        var t = {url:i.feedUrl + "?" + Math.random(), type:"GET", dataType:"xml", success:function (t) {
                            var n = e(t).find("item");
                            for (var r = 0; r < i.feedCount; r++) {
                                m.append("<li><a href='" + e(n[r]).find("link").text() + "' target='" + i.linkTarget + "'>" + e(n[r]).find("title").text() + "</a></li>")
                            }
                            k()
                        }};
                        var n = {url:"https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + i.feedCount + "&q=" + i.feedUrl + "?" + Math.random(), type:"GET", dataType:"jsonp", success:function (e) {
                            var t = e.responseData.feed.entries;
                            for (var n = 0; n < t.length; n++) {
                                m.append("<li><a href='" + t[n].link + "' target='" + i.linkTarget + "'>" + t[n].title + "</a></li>")
                            }
                            k()
                        }};
                        var r = i.loadType == "process" ? n : t;
                        e.ajax(r);
                        break;
                    case"twitter":
                        e.get(i.twitterLoadingFile, {name:i.twitterName, count:i.feedCount}, function (t) {
                            t = e.parseJSON(t);
                            for (var n = 0; n < t.length; n++) {
                                m.append("<li><a href='http://twitter.com/#!/" + t[n].user.id_str + "/status/" + t[n].id_str + "' target='_blank'>" + t[n].text + "</a></li>")
                            }
                            k()
                        });
                        break
                }
            }

            function k() {
                v.removeClass("mt-preloader");
                m.removeClass("mt-hide");
                A()
            }

            function L() {
                if (i.feedType == "rss-atom" || i.feedType == "twitter") {
                    clearTimeout(c);
                    l = false;
                    C()
                }
            }

            function A() {
                N();
                if (i.effect != "scroll")m.children("li:not(:first)").addClass("mt-hide");
                if (f) {
                    f = false;
                    if (i.autoplay) {
                        P();
                        I()
                    }
                } else j();
                _("first");
                if (i.refresh)c = setTimeout(L, O(i.refresh));
                l = true
            }

            function O(e) {
                var t;
                if (typeof e == "number")t = e; else {
                    var n = e.split(":");
                    n.reverse();
                    t = parseFloat(n[0]);
                    if (n[1])t += parseFloat(n[1]) * 60;
                    if (n[2])t += parseFloat(n[2]) * 3600
                }
                return t * 1e3
            }

            function M(e) {
                if (l)_(e.data.type)
            }

            function _(r) {
                if (!u) {
                    u = true;
                    B();
                    switch (r) {
                        case"first":
                            switch (i.effect) {
                                case"scroll":
                                    if (i.scrollStart == "outside")m.css("margin-left", n);
                                    j();
                                    break;
                                case"fade":
                                    m.children(":first").css({opacity:0}).animate({opacity:1}, i.transitionTime, function () {
                                        j()
                                    });
                                    break;
                                case"type":
                                    F(m.children(":first").css({opacity:0}).animate({opacity:1}, i.transitionTime).children("a"));
                                    break;
                                case"slide":
                                    m.children(":first").css({opacity:0, "margin-left":i.slideDistance}).animate({opacity:1, "margin-left":0}, i.transitionTime, function () {
                                        j()
                                    });
                                    break
                            }
                            u = false;
                            break;
                        case"prev":
                            switch (i.effect) {
                                case"scroll":
                                    if (i.scrollType == "discontinuous") {
                                        var s = D();
                                        var o = S.length - 1;
                                        var a;
                                        if (s == -1 || s == 0) {
                                            m.animate({"margin-left":n}, i.transitionTime, function () {
                                                m.css("margin-left", -t);
                                                m.animate({"margin-left":-S[o]}, i.transitionTime, function () {
                                                    u = false
                                                })
                                            })
                                        } else {
                                            a = -S[s - 1];
                                            m.animate({"margin-left":a}, i.transitionTime, function () {
                                                u = false
                                            })
                                        }
                                    } else {
                                        m.css({"margin-left":-e(m.children(":last")).outerWidth()}).children(":last").prependTo(m);
                                        m.animate({"margin-left":0}, i.transitionTime, function () {
                                            u = false
                                        })
                                    }
                                    b.mouseleave(function () {
                                        j()
                                    });
                                    break;
                                case"fade":
                                    m.children(":first").animate({opacity:0}, i.transitionTime, function () {
                                        e(this).addClass("mt-hide");
                                        m.children(":last").prependTo(m).removeClass("mt-hide").css({opacity:0}).animate({opacity:1}, i.transitionTime, function () {
                                            j()
                                        });
                                        u = false
                                    });
                                    break;
                                case"type":
                                    m.children(":first").animate({opacity:0}, i.transitionTime, function () {
                                        e(this).addClass("mt-hide");
                                        F(m.children(":last").prependTo(m).removeClass("mt-hide").css({opacity:0}).animate({opacity:1}, i.transitionTime).children("a"));
                                        u = false
                                    });
                                    break;
                                case"slide":
                                    m.children(":first").animate({opacity:0}, i.transitionTime, function () {
                                        e(this).addClass("mt-hide");
                                        m.children(":last").prependTo(m).removeClass("mt-hide").css({opacity:0, "margin-left":i.slideDistance}).animate({opacity:1, "margin-left":0}, i.transitionTime, function () {
                                            j()
                                        });
                                        u = false
                                    });
                                    break
                            }
                            break;
                        case"next":
                            switch (i.effect) {
                                case"scroll":
                                    if (i.scrollType == "discontinuous") {
                                        var s = D();
                                        var o = S.length - 1;
                                        var a;
                                        if (s == o) {
                                            m.animate({"margin-left":-t}, i.transitionTime, function () {
                                                m.css("margin-left", n);
                                                m.animate({"margin-left":0}, i.transitionTime, function () {
                                                    u = false
                                                })
                                            })
                                        } else {
                                            if (s == -1)a = 0; else a = -S[s + 1];
                                            m.animate({"margin-left":a}, i.transitionTime, function () {
                                                u = false
                                            })
                                        }
                                    } else {
                                        m.animate({"margin-left":-e(m.children(":first")).outerWidth()}, i.transitionTime, function () {
                                            m.css("margin-left", 0).children(":first").appendTo(m);
                                            u = false
                                        })
                                    }
                                    w.mouseleave(function () {
                                        j()
                                    });
                                    break;
                                case"fade":
                                    m.children(":first").animate({opacity:0}, i.transitionTime, function () {
                                        e(this).addClass("mt-hide").appendTo(m);
                                        m.children(":first").removeClass("mt-hide").css({opacity:0}).animate({opacity:1}, i.transitionTime, function () {
                                            j()
                                        });
                                        u = false
                                    });
                                    break;
                                case"type":
                                    m.children(":first").animate({opacity:0}, i.transitionTime, function () {
                                        e(this).addClass("mt-hide").appendTo(m);
                                        F(m.children(":first").removeClass("mt-hide").css({opacity:0}).animate({opacity:1}, i.transitionTime).children("a"));
                                        u = false
                                    });
                                    break;
                                case"slide":
                                    m.children(":first").animate({opacity:0}, i.transitionTime, function () {
                                        e(this).addClass("mt-hide").appendTo(m);
                                        m.children(":first").removeClass("mt-hide").css({opacity:0, "margin-left":i.slideDistance}).animate({opacity:1, "margin-left":0}, i.transitionTime, function () {
                                            j()
                                        });
                                        u = false
                                    });
                                    break
                            }
                            break
                    }
                }
            }

            function D() {
                var e = parseFloat(m.css("margin-left"));
                var t = S.length;
                if (e > 0) {
                    return-1
                } else {
                    e = Math.abs(e);
                    for (var n = 0; n < t - 1; n++) {
                        if (e >= S[n] && e < S[n + 1])return n
                    }
                    return t - 1
                }
            }

            function P() {
                s = true;
                if (i.effect == "scroll") {
                    r = setInterval(function () {
                        if (!u) {
                            var r = parseFloat(m.css("margin-left"));
                            m.css("margin-left", r - 1);
                            if (i.scrollType == "discontinuous") {
                                if (r < 0 && Math.abs(r) > t)m.css("margin-left", n)
                            } else {
                                if (r < 0 && Math.abs(r) > e(m.children("li")[0]).outerWidth())m.css("margin-left", 0).children(":first").appendTo(m)
                            }
                        }
                    }, i.scrollInterval)
                } else {
                    r = setInterval(function () {
                        _("next")
                    }, i.displayTime)
                }
            }

            function H() {
                s = false;
                clearInterval(r)
            }

            function B() {
                if (s) {
                    o = true;
                    H()
                }
            }

            function j() {
                if (o && !a) {
                    P();
                    o = false
                }
            }

            function F(e) {
                var t = e.html().split("");
                var n = 0;
                e.html("_");
                var r = setInterval(function () {
                    var i = e.html().split("_")[0] + t[n++];
                    if (n != t.length) {
                        i += "_"
                    }
                    e.html(i);
                    if (n == t.length) {
                        clearInterval(r);
                        j()
                    }
                }, i.typeInterval)
            }

            function I() {
                E.addClass("mt-pause")
            }

            function q() {
                E.removeClass("mt-pause")
            }

            function R() {
                return false
            }

            var t;
            var n;
            var r;
            var s = false;
            var o = false;
            var u = false;
            var a = false;
            var f = true;
            var l = false;
            var c;
            var h = e(this);
            var p = h.children(".mt-body");
            var d = p.children(".mt-label");
            var v = p.children(".mt-news");
            var m = v.children("ul");
            var g = m.children("li");
            var y = p.children(".mt-controls");
            var b = y.children(".mt-prev");
            var w = y.children(".mt-next");
            var E = y.children(".mt-play");
            if (i.effect == "scroll")h.addClass("mt-scroll");
            if (d.length)v.css("left", d.outerWidth(true));
            T();
            e(window).resize(T);
            if (i.scrollType == "discontinuous") {
                var S = [];
                var x = 0;
                m.children().each(function () {
                    S.push(x);
                    x += e(this).outerWidth()
                })
            }
            v.hover(function () {
                if (l) {
                    B();
                    a = true
                }
            }, function () {
                if (l) {
                    a = false;
                    j()
                }
            });
            b.mousedown(R).bind("click", {type:"prev"}, M);
            w.mousedown(R).bind("click", {type:"next"}, M);
            E.mousedown(R).click(function () {
                if (l) {
                    if (s) {
                        H();
                        q()
                    } else {
                        P();
                        I()
                    }
                }
            });
            if (i.feedType == "rss-atom" || i.feedType == "twitter") {
                C()
            } else {
                A()
            }
            h.data("pause", B);
            h.data("resume", j);
            h.data("refresh", L)
        })
    }, pause:function () {
        return this.each(function () {
            e(this).data("pause")()
        })
    }, resume:function () {
        return this.each(function () {
            e(this).data("resume")()
        })
    }, refresh:function () {
        return this.each(function () {
            e(this).data("refresh")()
        })
    }};
    e.fn.modernTicker = function (t) {
        if (i[t]) {
            return i[t].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof t === "object" || !t) {
            return i.init.apply(this, arguments)
        } else {
            e.error("Method " + t + " does not exist on jQuery.modernTicker")
        }
    }
})(jQuery)