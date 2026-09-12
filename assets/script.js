/* AshNoise portfolio — 分类作品集 + 作品详情视图 */
(function () {
  "use strict";

  var P = window.PORTFOLIO;
  var CAT = {};
  P.categories.forEach(function (c) { CAT[c.id] = c; });

  /* ---------- tools ---------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  var ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';

  /* ---------- Hero 背景轮播 ---------- */
  (function initHeroSlides() {
    var wrap = document.getElementById("heroBg");
    if (!wrap || !P.heroBg || !P.heroBg.length) return;
    P.heroBg.forEach(function (src, i) {
      var d = el("div", "hero-slide");
      d.style.backgroundImage = "url('" + src + "')";
      if (i === 0) d.classList.add("on");
      wrap.appendChild(d);
    });
    var slides = wrap.children;
    var idx = 0;
    var timer = P.heroInterval || 6000;
    setInterval(function () {
      if (!slides.length) return;
      slides[idx].classList.remove("on");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("on");
    }, timer);
  })();
  /* ---------- Reveal on scroll ---------- */
  function observeReveals() {
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }
  }

  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Render categories + chips ---------- */
  var chipsEl = document.getElementById("catChips");
  P.categories.forEach(function (c) {
    var n = P.works.filter(function (w) { return w.cat === c.id; }).length;
    var a = el("a", "cat-chip", "<b>" + esc(c.name) + "</b><i>" + n + "</i>");
    a.href = "#cat-" + c.id;
    chipsEl.appendChild(a);
    a.addEventListener("click", function (ev) {
      var id = a.getAttribute("href").slice(1);
      var block = document.getElementById(id);
      if (!block) return;
      var head = block.querySelector(".cat-block-head");
      if (!block.classList.contains("open")) toggleCat(block, head);
      ev.preventDefault();
      setTimeout(function () { block.scrollIntoView({ behavior: "smooth", block: "start" }); }, 50);
    });
  });

  var bodyEl = document.getElementById("worksBody");
  var CAT_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  P.categories.forEach(function (c) {
    var ws = P.works.filter(function (w) { return w.cat === c.id; });
    if (!ws.length) return;
    var block = el("section", "cat-block reveal");
    block.id = "cat-" + c.id;

    var head = el("button", "cat-block-head");
    head.type = "button";
    head.setAttribute("aria-expanded", "false");
    head.appendChild(el("h3", "cat-name", esc(c.name)));
    head.appendChild(el("span", "cat-en", esc(c.en)));
    head.appendChild(el("span", "cat-count", ws.length + " 部作品"));
    head.appendChild(el("span", "cat-chevron", CAT_ICON));

    var grid = el("div", "works-grid");
    ws.forEach(function (w) { grid.appendChild(makeCard(w)); });

    var inner = el("div", "cat-collapse-inner");
    inner.appendChild(grid);
    var collapse = el("div", "cat-collapse");
    collapse.appendChild(inner);

    block.appendChild(head);
    block.appendChild(collapse);
    bodyEl.appendChild(block);

    head.addEventListener("click", function () { toggleCat(block, head); });
  });

  function toggleCat(block, head) {
    var open = block.classList.toggle("open");
    if (head) head.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      // 同时只展开一个分类
      document.querySelectorAll(".cat-block.open").forEach(function (other) {
        if (other !== block) {
          other.classList.remove("open");
          var oh = other.querySelector(".cat-block-head");
          if (oh) oh.setAttribute("aria-expanded", "false");
        }
      });
    }
    return open;
  }
  observeReveals();

  function makeCard(w) {
    var card = el("article", "work-card");
    card.dataset.id = w.id;
    var media = el("div", "work-media");
    var img = document.createElement("img");
    img.src = w.poster; img.alt = w.title + " 作品封面"; img.loading = "lazy";
    media.appendChild(img);
    media.appendChild(el("div", "work-play", ICON_PLAY));
    media.appendChild(el("span", "work-duration", esc(w.dur)));
    var info = el("div", "work-info");
    info.appendChild(el("h3", null, esc(w.title)));
    var meta = el("p", "work-meta");
    meta.appendChild(el("span", "tag", esc(w.tag || CAT[w.cat].name)));
    meta.appendChild(el("span", "role", "声音设计"));
    info.appendChild(meta);
    info.appendChild(el("p", "work-desc", esc(w.desc)));
    card.appendChild(media);
    card.appendChild(info);
    card.addEventListener("click", function () { openDetail(w); });
    return card;
  }

  /* =========================================================
     DETAIL VIEWER
     sections: concept / video / plan(图片) / req / shot
     ========================================================= */
  var detail = document.getElementById("detail");
  var detailBody = document.getElementById("detailBody");
  var detailTabs = document.getElementById("detailTabs");
  var detailTitle = document.getElementById("detailTitle");
  var detailSub = document.getElementById("detailSub");
  var state = { work: null, sections: [], active: "concept", loadedVideo: false, imgScale: 1 };
  var detailPager = document.getElementById("detailPager");
  var pgPrev = document.getElementById("pgPrev");
  var pgNext = document.getElementById("pgNext");
  var pgInfo = document.getElementById("pgInfo");

  function buildSections(w) {
    var s = w.hideConcept ? [] : [{ id: "concept", label: "设计理念" }];
    if (w.plan && w.plan.images && w.plan.images.length) {
      s.push({
        id: "plan", label: w.plan.label || "策划案",
        images: w.plan.images, many: w.plan.images.length > 1,
        cssw: w.plan.cssw || 1500, caption: w.plan.caption || "策划案", dark: false,
        download: w.plan.file, dlLabel: w.plan.dlLabel || ".xmind"
      });
    }
    var vids = (w.videos && w.videos.length) ? w.videos : [{ label: "视频", src: w.video, poster: w.poster }];
    s.push({ id: "video", label: "视频", videos: vids });
    if (w.req && w.req.length) {
      s.push({ id: "req", label: "音频需求表", images: w.req, many: w.req.length > 1, cssw: 1500, caption: "音频需求表", dark: false });
    }
    if (w.shots && w.shots.length) {
      s.push({ id: "shot", label: "工程截图", images: w.shots, many: w.shots.length > 1, cssw: 1600, dark: true, caption: "工程截图" });
    } else if (w.shot) {
      s.push({ id: "shot", label: "工程截图", image: w.shot, cssw: 1600, dark: true, caption: "工程截图" });
    }
    return s;
  }

  function openDetail(w) {
    state.work = w;
    state.sections = buildSections(w);
    state.active = state.sections[0].id;
    state.imgScale = 1;
    detailTitle.textContent = w.title;
    detailSub.textContent = (CAT[w.cat] ? CAT[w.cat].name : "") + " · 时长 " + w.dur + (w.desc ? " — " + w.desc : "");
    detail.classList.add("open");
    detail.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    detailTabs.innerHTML = "";
    state.sections.forEach(function (s) {
      var b = el("button", "detail-tab", esc(s.label));
      b.type = "button"; b.setAttribute("role", "tab");
      if (s.id === state.active) b.classList.add("active");
      b.addEventListener("click", function () { showTab(s.id); });
      detailTabs.appendChild(b);
    });

    detailBody.innerHTML = "";
    state.sections.forEach(function (s) { detailBody.appendChild(buildPane(w, s)); });
    detailBody.querySelector('[data-pane="' + state.active + '"]').classList.add("active");
    updatePager();

    // 预加载视频
    setTimeout(function () {
      var v = detailBody.querySelector('[data-pane="video"] video');
      if (v && !v.getAttribute("src")) { v.src = (w.videos && w.videos[0]) ? w.videos[0].src : w.video; v.load(); }
    }, 30);
    // 默认展示视频时尝试自动播放
    if (state.active === "video") setTimeout(tryPlay, 400);
  }

  function closeDetail() {
    detail.classList.remove("open");
    detail.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    var v = detailBody.querySelector("video");
    if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
    state.work = null;
  }

  function showTab(id) {
    var w = state.work;
    if (!w) return;
    var prev = state.active;
    state.active = id;
    var tabs = detailTabs.querySelectorAll(".detail-tab");
    tabs.forEach(function (t, i) { t.classList.toggle("active", state.sections[i].id === id); });
    var panes = detailBody.querySelectorAll(".detail-pane");
    panes.forEach(function (p) { p.classList.remove("active"); });
    var cur = detailBody.querySelector('[data-pane="' + id + '"]');
    if (cur) { cur.classList.add("active"); cur.scrollTop = 0; }
    if (prev === "video") {
      var prevPane = detailBody.querySelector('[data-pane="video"]');
      var pv = prevPane ? prevPane.querySelector("video") : null;
      if (pv) pv.pause();
    }
    if (id === "video") {
      var v2 = detailBody.querySelector('[data-pane="video"] video');
      if (v2 && !v2.getAttribute("src")) { v2.src = w.video; v2.load(); }
      setTimeout(tryPlay, 50);
    }
    if (id === "req" || id === "shot" || id === "plan") {
      state.imgScale = 1;
      setTimeout(fitImages, 40);
    }
    updatePager();
  }

  function pageStep(dir) {
    var secs = state.sections || [];
    var idx = -1;
    for (var i = 0; i < secs.length; i++) { if (secs[i].id === state.active) { idx = i; break; } }
    if (idx < 0) return;
    var next = idx + dir;
    if (next < 0 || next >= secs.length) return;
    detailBody.querySelectorAll("video").forEach(function (vv) { vv.pause(); });
    showTab(secs[next].id);
  }

  function updatePager() {
    if (!detailPager) return;
    var secs = state.sections || [];
    var idx = -1;
    for (var i = 0; i < secs.length; i++) { if (secs[i].id === state.active) { idx = i; break; } }
    if (idx < 0) return;
    if (pgInfo) pgInfo.textContent = secs[idx].label + " · " + (idx + 1) + " / " + secs.length;
    if (pgPrev) pgPrev.disabled = (idx <= 0);
    if (pgNext) pgNext.disabled = (idx >= secs.length - 1);
  }

  function tryPlay() {
    var v = detailBody.querySelector(".detail-pane.active video");
    if (!v) return;
    if (v.paused && v.readyState >= 1) {
      v.play()["catch"](function () {});
    }
  }

  /* ---------- pane builders ---------- */
  function buildPane(w, s) {
    var pane = el("div", "detail-pane pane-" + s.id);
    pane.dataset.pane = s.id;

    if (s.id === "video") {
      var vids = (s.videos && s.videos.length) ? s.videos : [{ label: "视频", src: w.video, poster: w.poster }];
      var vIdx = 0;
      var seg = null;
      if (vids.length > 1) {
        seg = el("div", "dv-seg");
        vids.forEach(function (v, i) {
          var b = el("button", "dv-seg-btn" + (i === 0 ? " active" : ""), esc(v.label));
          b.type = "button";
          b.addEventListener("click", function () {
            if (i === vIdx) return;
            vIdx = i;
            seg.querySelectorAll(".dv-seg-btn").forEach(function (x, xi) { x.classList.toggle("active", xi === vIdx); });
            vid.pause();
            vid.src = vids[vIdx].src;
            vid.poster = vids[vIdx].poster || "";
            vid.load();
            setTimeout(function () { vid.play()["catch"](function () {}); }, 80);
          });
          seg.appendChild(b);
        });
        pane.appendChild(seg);
      }
      var wrap = el("div", "dv-wrap");
      var vid = document.createElement("video");
      vid.controls = true; vid.playsInline = true; vid.preload = "metadata";
      vid.poster = (vids[0] && vids[0].poster) || w.poster;
      vid.src = vids[0].src;
      var pb = el("button", "dv-play", ICON_PLAY);
      pb.type = "button";
      pb.addEventListener("click", function () { vid.play()["catch"](function () {}); });
      vid.addEventListener("playing", function () { pb.classList.add("hide"); });
      vid.addEventListener("pause", function () { if (vid.currentTime < 0.5) pb.classList.remove("hide"); });
      wrap.appendChild(vid);
      wrap.appendChild(pb);
      pane.appendChild(wrap);
      var hint = el("p", "dv-hint");
            hint.textContent = "建议佩戴耳机欣赏 · 点击画面播放 / 暂停";
      pane.appendChild(hint);
      if (w.source) {
        var srcRow = el("p", "dv-src-row");
        var srcBtn = el("a", "dv-src", "⬇ 下载源文件（原始高清 · 百度网盘）");
        srcBtn.href = w.source; srcBtn.target = "_blank"; srcBtn.rel = "noopener";
        srcRow.appendChild(srcBtn);
        pane.appendChild(srcRow);
      }
      return pane;
    }

    if (s.id === "concept") {
      var card = el("div", "concept-card");
      card.appendChild(el("p", "kicker", "DESIGN CONCEPT · 设计理念"));
      var h = el("h3"); h.textContent = w.conceptTitle || (w.title + " 声音设计理念");
      card.appendChild(h);
      String(w.concept).split("\n").forEach(function (line) {
        line = line.trim();
        if (!line) return;
        var p = el("p"); p.textContent = line; card.appendChild(p);
      });
      var meta = el("div", "concept-meta");
      meta.innerHTML = "<span>作品 <b>" + esc(w.title) + "</b></span><span>类别 <b>" + esc(CAT[w.cat].name) + "</b></span><span>时长 <b>" + esc(w.dur) + "</b></span>";
      card.appendChild(meta);
      pane.appendChild(card);
      return pane;
    }

    // 图片类：req / shot / plan
    var toolbar = el("div", "img-toolbar");
    var bOut = el("button", null, "− 缩小"); bOut.type = "button";
    var bFit = el("button", null, "适应宽度"); bFit.type = "button";
    var bIn = el("button", null, "＋ 放大"); bIn.type = "button";
    bOut.addEventListener("click", function () { zoomImages(-1); });
    bFit.addEventListener("click", function () { state.imgScale = 1; fitImages(); });
    bIn.addEventListener("click", function () { zoomImages(1); });
    toolbar.appendChild(bOut);
    toolbar.appendChild(bFit);
    toolbar.appendChild(bIn);
    if (s.download) {
      var dl = el("a", "img-dl", "下载 " + esc(s.dlLabel || "文件"));
      dl.href = s.download;
      dl.download = String(s.download).split("/").pop();
      dl.target = "_blank"; dl.rel = "noopener";
      toolbar.appendChild(dl);
    }
    toolbar.appendChild(el("span", "img-tip", esc(s.label) + " · 可滚动 / 缩放查看"));

    var scroll = el("div", "img-scroll");
    var imgs = s.images && s.images.length ? s.images : [s.image];
    imgs.forEach(function (src, i) {
      var fig = el("figure", "img-fig");
      var capParts = [];
      if (s.caption) capParts.push(esc(s.caption));
      if (imgs.length > 1) capParts.push("第 " + (i + 1) + " / " + imgs.length + " 页");
      if (capParts.length) fig.appendChild(el("figcaption", null, capParts.join(" · ")));
      var a = el("a", "img-link");
      a.href = src; a.target = "_blank"; a.rel = "noopener"; a.title = "在新标签打开大图";
      var img = document.createElement("img");
      img.src = src; img.alt = s.caption || "图片";
      img.dataset.cssw = s.cssw || "";
      if (s.dark) img.classList.add("dark");
      a.appendChild(img);
      fig.appendChild(a);
      scroll.appendChild(fig);
    });

    pane.appendChild(toolbar);
    pane.appendChild(scroll);
    return pane;
  }

  function activeScroll() { return detailBody.querySelector(".detail-pane.active .img-scroll"); }
  function activeImgs() { return detailBody.querySelectorAll(".detail-pane.active .img-scroll img"); }

  function fitImages() {
    var scroll = activeScroll(); if (!scroll) return;
    var avail = Math.max(260, scroll.clientWidth - 36);
    activeImgs().forEach(function (img) {
      var cssw = parseFloat(img.dataset.cssw) || (img.naturalWidth ? img.naturalWidth / 2 : 1500);
      var w = Math.min(avail, cssw) * state.imgScale;
      img.style.width = w + "px";
    });
  }
  function zoomImages(dir) {
    state.imgScale = Math.max(0.5, Math.min(3, state.imgScale * (dir > 0 ? 1.25 : 0.8)));
    fitImages();
  }

  /* ---------- events ---------- */
  document.getElementById("detailClose").addEventListener("click", closeDetail);
  document.getElementById("detailBack").addEventListener("click", closeDetail);
  if (pgPrev) pgPrev.addEventListener("click", function () { pageStep(-1); });
  if (pgNext) pgNext.addEventListener("click", function () { pageStep(1); });
  document.addEventListener("keydown", function (e) {
    if (!detail.classList.contains("open")) return;
    if (e.target && e.target.closest && e.target.closest("video")) return;
    if (e.key === "ArrowLeft") { pageStep(-1); e.preventDefault(); return; }
    if (e.key === "ArrowRight") { pageStep(1); e.preventDefault(); return; }
    if (e.key === "Escape") { closeDetail(); e.preventDefault(); }
  });
  window.addEventListener("resize", function () {
    if (detail.classList.contains("open")) fitImages();
  });

  /* ---------- 我的日常（手牌扇形相册） ---------- */
  var dailyBody = document.getElementById("dailyBody");
  var albums = [];
  if (dailyBody && P.daily) {
    var tabsWrap = el("div", "daily-tabs");
    var fansWrap = el("div", "daily-fans");
    P.daily.forEach(function (g, gi) {
      var items = [];
      g.files.forEach(function (src) { items.push({ src: src, name: g.name }); });
      albums.push({ name: g.name, en: g.en || "", items: items });

      var t = el("button", "daily-tab" + (gi === 0 ? " active" : ""), "<b>" + esc(g.name) + "</b><i>" + g.files.length + "</i>");
      t.type = "button";
      t.addEventListener("click", function () { setAlbum(gi); });
      tabsWrap.appendChild(t);

      var n = items.length;
      var mid = (n - 1) / 2;
      var step = n > 8 ? 2.4 : n > 4 ? 3.6 : 5;
      var fan = el("div", "card-fan" + (gi === 0 ? " active" : ""));
      fan.setAttribute("data-album", String(gi));
      var cardEls = [];
      items.forEach(function (it, ii) {
        var deg = (ii - mid) * step;
        var btn = el("button", "hcard");
        btn.type = "button";
        btn.style.transform = "rotate(" + deg.toFixed(1) + "deg)";
        var img = document.createElement("img");
        img.src = it.src; img.alt = it.name; img.loading = "lazy";
        btn.appendChild(img);
        var cap = el("span", "hcap", esc(g.name) + " · " + String(ii + 1).padStart(2, "0"));
        btn.appendChild(cap);
        cardEls.push(btn);
        fan.appendChild(btn);
      });
      function nearestIdx(cx) {
        var best = 0, bd = 1e9;
        cardEls.forEach(function (c, ci) {
          var r = c.getBoundingClientRect();
          var cc = r.left + r.width / 2;
          var d = Math.abs(cc - cx);
          if (d < bd) { bd = d; best = ci; }
        });
        return best;
      }
      fan.addEventListener("pointermove", function (ev) {
        var ni = nearestIdx(ev.clientX);
        cardEls.forEach(function (c, ci) { c.classList.toggle("lift", ci === ni); });
      });
      fan.addEventListener("pointerleave", function () {
        cardEls.forEach(function (c) { c.classList.remove("lift"); });
      });
      fan.addEventListener("click", function (ev) {
        var ni = nearestIdx(ev.clientX);
        if (items[ni]) openLightbox(gi, items[ni]);
      });
      fansWrap.appendChild(fan);
    });
    dailyBody.appendChild(tabsWrap);
    dailyBody.appendChild(fansWrap);
    function setAlbum(gi) {
      tabsWrap.querySelectorAll(".daily-tab").forEach(function (x, xi) { x.classList.toggle("active", xi === gi); });
      fansWrap.querySelectorAll(".card-fan").forEach(function (f, fi) { f.classList.toggle("active", fi === gi); });
    }
  }

  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var curAlbum = 0;
  var lbIndex = 0;

  function openLightbox(ai, item) {
    if (!lb || !albums[ai]) return;
    curAlbum = ai;
    lbIndex = albums[ai].items.indexOf(item);
    if (lbIndex < 0) lbIndex = 0;
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    showLb();
  }
  function showLb() {
    var al = albums[curAlbum];
    if (!al || !al.items[lbIndex]) return;
    lbImg.src = al.items[lbIndex].src;
    lbImg.alt = al.items[lbIndex].name;
    lbCap.textContent = al.name + " · " + (lbIndex + 1) + " / " + al.items.length;
  }
  function closeLb() {
    if (!lb) return;
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.removeAttribute("src");
    document.body.style.overflow = "";
  }
  function lbStep(d) {
    var al = albums[curAlbum];
    if (!al || !al.items.length) return;
    lbIndex = (lbIndex + d + al.items.length) % al.items.length;
    showLb();
  }


  if (lb) {
    var bPrev = document.getElementById("lbPrev");
    var bNext = document.getElementById("lbNext");
    if (bPrev) bPrev.addEventListener("click", function () { lbStep(-1); });
    if (bNext) bNext.addEventListener("click", function () { lbStep(1); });
    lb.querySelectorAll("[data-lb-close]").forEach(function (x) { x.addEventListener("click", closeLb); });
  }

  document.addEventListener("keydown", function (e) {
    if (!lb || !lb.classList.contains("open")) return;
    if (e.key === "Escape") { closeLb(); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { lbStep(-1); e.preventDefault(); }
    else if (e.key === "ArrowRight") { lbStep(1); e.preventDefault(); }
  });

  /* 联系方式一键复制（邮箱 / 电话 / 微信） */
  function attachCopy(el) {
    if (!el) return;
    var msg = el.querySelector(".wx-msg");
    function ok() {
      if (msg) { msg.textContent = "已复制 ✓"; setTimeout(function () { msg.textContent = "点击复制"; }, 1600); }
    }
    function doCopy() {
      var text = el.getAttribute("data-copy") || "NOISEASHSTUDIO";
      function fb() {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta); ok();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(ok)["catch"](fb);
      } else { fb(); }
    }
    el.addEventListener("click", function (e) { e.preventDefault(); doCopy(); });
    el.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); doCopy(); } });
  }
  var copyEls = document.querySelectorAll(".copy-item, #wxItem");
  copyEls.forEach(attachCopy);

  onScroll();
})();