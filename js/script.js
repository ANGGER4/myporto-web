document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const data = window.PORTFOLIO_DATA;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ------------------------------------------------------------------
    // 1. THEME TOGGLE (Dark Mode Default)
    // ------------------------------------------------------------------
    const themeToggle = document.getElementById('themeToggle');
    const iconSun = document.getElementById('iconSun');
    const iconMoon = document.getElementById('iconMoon');

    function applyTheme(theme, animate = false) {
        if (animate) {
            html.classList.add('theme-anim');
            window.setTimeout(() => html.classList.remove('theme-anim'), 400);
        }
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (iconSun && iconMoon) {
            iconSun.style.display = theme === 'dark' ? 'block' : 'none';
            iconMoon.style.display = theme === 'light' ? 'block' : 'none';
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme, false);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next, true);
        });
    }

    // ------------------------------------------------------------------
    // 2. MOBILE MENU DRAWER
    // ------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
        });

        mobileDrawer.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileDrawer.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // ------------------------------------------------------------------
    // 3. RENDER STATIC DATA (Works, Principles, History)
    // ------------------------------------------------------------------
    function getMotifSvg(motif, accent) {
        const stroke = 'currentColor';
        switch (motif) {
            case 'savings':
                return `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
                    <path d="M24 156H296M48 156V110M96 156V86M144 156V96M192 156V62M240 156V44" stroke="${stroke}" stroke-opacity="0.25" stroke-width="1"/>
                    <polyline points="48,124 96,98 144,106 192,72 240,48 276,38" stroke="${accent}" stroke-width="2"/>
                    <circle cx="240" cy="48" r="4" fill="${accent}"/>
                    <rect x="24" y="24" width="90" height="22" stroke="${stroke}" stroke-opacity="0.3"/>
                </svg>`;
            case 'ml':
                return `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
                    <circle cx="70" cy="60" r="10" stroke="${stroke}" stroke-opacity="0.4"/>
                    <circle cx="70" cy="100" r="10" stroke="${stroke}" stroke-opacity="0.4"/>
                    <circle cx="70" cy="140" r="10" stroke="${stroke}" stroke-opacity="0.4"/>
                    <circle cx="160" cy="75" r="12" stroke="${accent}" stroke-width="1.75"/>
                    <circle cx="160" cy="125" r="12" stroke="${accent}" stroke-width="1.75"/>
                    <circle cx="250" cy="100" r="14" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-width="2"/>
                    <path d="M80 60L148 75M80 100L148 75M80 100L148 125M80 140L148 125M172 75L236 100M172 125L236 100" stroke="${stroke}" stroke-opacity="0.3"/>
                </svg>`;
            case 'ui':
                return `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
                    <rect x="32" y="26" width="256" height="148" stroke="${stroke}" stroke-opacity="0.3"/>
                    <line x1="32" y1="54" x2="288" y2="54" stroke="${stroke}" stroke-opacity="0.3"/>
                    <rect x="48" y="70" width="96" height="86" stroke="${accent}" stroke-width="1.5"/>
                    <rect x="158" y="70" width="114" height="38" stroke="${stroke}" stroke-opacity="0.35"/>
                    <rect x="158" y="118" width="114" height="38" stroke="${stroke}" stroke-opacity="0.35"/>
                </svg>`;
            case 'data':
                return `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
                    <rect x="44" y="34" width="232" height="132" stroke="${stroke}" stroke-opacity="0.25"/>
                    <line x1="44" y1="68" x2="276" y2="68" stroke="${stroke}" stroke-opacity="0.25"/>
                    <line x1="44" y1="102" x2="276" y2="102" stroke="${stroke}" stroke-opacity="0.25"/>
                    <line x1="44" y1="136" x2="276" y2="136" stroke="${stroke}" stroke-opacity="0.25"/>
                    <rect x="58" y="45" width="70" height="12" fill="${accent}" fill-opacity="0.75"/>
                    <rect x="58" y="79" width="142" height="12" fill="${stroke}" fill-opacity="0.25"/>
                    <rect x="58" y="113" width="110" height="12" fill="${accent}" fill-opacity="0.5"/>
                    <rect x="58" y="147" width="180" height="12" fill="${stroke}" fill-opacity="0.2"/>
                </svg>`;
            case 'algo':
                return `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
                    <circle cx="160" cy="44" r="12" stroke="${accent}" stroke-width="2"/>
                    <circle cx="104" cy="100" r="12" stroke="${stroke}" stroke-opacity="0.5"/>
                    <circle cx="216" cy="100" r="12" stroke="${stroke}" stroke-opacity="0.5"/>
                    <circle cx="72" cy="156" r="10" stroke="${stroke}" stroke-opacity="0.35"/>
                    <circle cx="132" cy="156" r="10" stroke="${accent}" stroke-width="1.5"/>
                    <circle cx="188" cy="156" r="10" stroke="${stroke}" stroke-opacity="0.35"/>
                    <circle cx="248" cy="156" r="10" stroke="${stroke}" stroke-opacity="0.35"/>
                    <path d="M151 53L112 91M169 53L208 91M96 110L78 147M111 110L128 147M209 110L192 147M224 110L242 147" stroke="${stroke}" stroke-opacity="0.35"/>
                </svg>`;
            case 'pos':
                return `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
                    <rect x="34" y="28" width="154" height="144" stroke="${stroke}" stroke-opacity="0.3"/>
                    <rect x="200" y="28" width="86" height="144" stroke="${accent}" stroke-width="1.5"/>
                    <line x1="214" y1="54" x2="272" y2="54" stroke="${stroke}" stroke-opacity="0.35"/>
                    <line x1="214" y1="78" x2="272" y2="78" stroke="${stroke}" stroke-opacity="0.35"/>
                    <line x1="214" y1="102" x2="272" y2="102" stroke="${stroke}" stroke-opacity="0.35"/>
                    <rect x="214" y="132" width="58" height="24" fill="${accent}" fill-opacity="0.8"/>
                    <rect x="48" y="44" width="56" height="48" stroke="${stroke}" stroke-opacity="0.3"/>
                    <rect x="116" y="44" width="56" height="48" stroke="${stroke}" stroke-opacity="0.3"/>
                    <rect x="48" y="106" width="56" height="48" stroke="${stroke}" stroke-opacity="0.3"/>
                    <rect x="116" y="106" width="56" height="48" stroke="${accent}" stroke-width="1.5"/>
                </svg>`;
            default:
                return `<svg viewBox="0 0 320 200" fill="none" aria-hidden="true">
                    <rect x="44" y="40" width="96" height="120" stroke="${accent}" stroke-width="1.75"/>
                    <rect x="180" y="40" width="96" height="52" stroke="${stroke}" stroke-opacity="0.4"/>
                    <rect x="180" y="108" width="96" height="52" stroke="${stroke}" stroke-opacity="0.4"/>
                    <path d="M140 66H180M140 134H180" stroke="${accent}" stroke-width="1.5" stroke-dasharray="3 3"/>
                </svg>`;
        }
    }

    function getPrincipleIcon(icon) {
        const map = {
            zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
            grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
            code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
            cpu: '<rect x="4" y="4" width="16" height="16"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>',
            shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
            git: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>'
        };
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">${map[icon] || map.code}</svg>`;
    }

    const worksGrid = document.getElementById('worksGrid');
    if (worksGrid && data?.projects) {
        worksGrid.innerHTML = data.projects.map((p) => `
            <article class="work-card" style="--proj-accent: ${p.accent}; --proj-ink-dark: ${p.accentInk}; --proj-ink-light: ${p.accentInkLight || p.accentInk};" data-reveal>
                <div>
                    <div class="work-meta">
                        <span class="work-index">${p.index}</span>
                        <span class="hud-label">${p.category}</span>
                    </div>
                    <div class="work-preview">
                        ${getMotifSvg(p.motif, p.accent)}
                    </div>
                    <h3 class="work-title">${p.name}<span>${p.nameAccent}</span></h3>
                    <p class="work-desc">${p.description}</p>
                </div>
                <div>
                    <div class="work-tags">
                        <span class="chip chip-status">${p.status}</span>
                        ${p.stack.map((t) => `<span class="chip">${t}</span>`).join('')}
                    </div>
                    <div class="work-links">
                        <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="work-link">Source Code ↗</a>
                        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="work-link" style="color: var(--proj-ink);">Live Demo ↗</a>` : ''}
                    </div>
                </div>
            </article>
        `).join('');
    }

    const principlesGrid = document.getElementById('principlesGrid');
    if (principlesGrid && data?.principles) {
        principlesGrid.innerHTML = data.principles.map((item) => `
            <article class="principle-card" data-reveal>
                <div class="principle-head">
                    <div class="icon-box" aria-hidden="true">${getPrincipleIcon(item.icon)}</div>
                    <span class="hud-label">${item.index}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="work-tags" style="margin-bottom: 0; margin-top: auto;">
                    ${item.tags.map((tag) => `<span class="chip">${tag}</span>`).join('')}
                </div>
            </article>
        `).join('');
    }

    const historyList = document.getElementById('historyList');
    if (historyList && data?.experience) {
        historyList.innerHTML = data.experience.map((row) => `
            <article class="history-row" data-reveal>
                <div class="history-period">
                    <span class="hud-label" style="color: var(--ink);">${row.period}</span>
                    <span class="hud-label">${row.category}</span>
                </div>
                <div>
                    <h3 class="history-title">${row.title}</h3>
                    <div class="history-org">${row.organization}</div>
                    <p class="history-desc">${row.description}</p>
                </div>
                <div class="history-tags">
                    ${row.tags.map((t) => `<span class="chip">${t}</span>`).join('')}
                </div>
            </article>
        `).join('');
    }

    // ------------------------------------------------------------------
    // 4. COPY EMAIL TO CLIPBOARD
    // ------------------------------------------------------------------
    document.querySelectorAll('.js-copy-email').forEach((btn) => {
        btn.addEventListener('click', async () => {
            const email = btn.getAttribute('data-email') || 'devnauro@gmail.com';
            const labelEl = btn.querySelector('span') || btn;
            const originalText = labelEl.textContent;
            try {
                await navigator.clipboard.writeText(email);
                labelEl.textContent = 'Copied ✓';
                window.setTimeout(() => {
                    labelEl.textContent = originalText;
                }, 1800);
            } catch {
                window.location.href = `mailto:${email}`;
            }
        });
    });

    // ------------------------------------------------------------------
    // 5. LENIS SMOOTH SCROLL
    // ------------------------------------------------------------------
    let lenis = null;
    if (!prefersReduced && typeof window.Lenis === 'function') {
        lenis = new window.Lenis({
            lerp: 0.2,
            smoothWheel: true
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            if (lenis) {
                lenis.scrollTo(target, { offset: -49 });
            } else {
                target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
            }
        });
    });

    // ------------------------------------------------------------------
    // 6. ARTCRAFT SCROLL CHOREOGRAPHY:
    //    - Hero Wordmark Morph (Center -> Top-Right Docked)
    //    - 4-Stage Per-Letter Curved Floating Section Navigator
    //    - 60px Ruler Percent & Indicator
    // ------------------------------------------------------------------
    const rulerPercent = document.getElementById('rulerPercent');
    const rulerIndicator = document.getElementById('rulerIndicator');
    const heroWordmark = document.getElementById('heroWordmark');
    const heroSpiralSvg = document.querySelector('.hero-spiral-svg');
    const hudOverlay = document.getElementById('hudJumpOverlay');

    // Split Hero wordmark into per-letter spans
    let wmLetters = [];
    let wmBaseRects = [];
    if (heroWordmark) {
        const text = heroWordmark.textContent || 'ANGGER ABROR';
        heroWordmark.textContent = '';
        wmLetters = Array.from(text).map((ch, idx) => {
            const span = document.createElement('span');
            span.className = 'wm-letter';
            span.style.setProperty('--wm-i', String(idx));
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            heroWordmark.appendChild(span);
            return span;
        });
    }

    // Build 4-stage per-letter floating section jump labels
    const hudSections = [
        { id: 'profile', label: 'PROFILE' },
        { id: 'works', label: 'WORKS' },
        { id: 'principles', label: 'PRINCIPLES' },
        { id: 'experience', label: 'HISTORY' },
        { id: 'contact', label: 'CONTACT' }
    ];

    const hudItems = [];
    if (hudOverlay) {
        hudSections.forEach((sec) => {
            const el = document.getElementById(sec.id);
            if (!el) return;

            const hit = document.createElement('a');
            hit.className = 'hud-jump-hit';
            hit.href = `#${sec.id}`;
            hit.setAttribute('aria-label', `Jump to ${sec.label}`);
            hit.addEventListener('click', (e) => {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(el, { offset: -49 });
                } else {
                    el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
                }
            });
            hudOverlay.appendChild(hit);

            const chars = Array.from(sec.label).map((ch) => {
                const span = document.createElement('span');
                span.className = 'hud-char';
                span.textContent = ch === ' ' ? '\u00A0' : ch;
                hudOverlay.appendChild(span);
                return { span, width: 0 };
            });

            hudItems.push({ id: sec.id, el, label: sec.label, hit, chars, totalWidth: 0 });
        });
    }

    const rulerTrack = document.querySelector('.ruler-track');
    let cachedVw = window.innerWidth;
    let cachedVh = window.innerHeight;
    let cachedDocHeight = 0;
    let cachedRailHeight = 0;
    let cachedSectionTops = [];
    let lastScrollY = -1;
    let lastPct = -1;
    let lastActiveIdx = -2;

    function getHudLayout(vw) {
        const isDesktop = vw >= 1024;
        return {
            isDesktop,
            rightEdge: isDesktop ? vw - 76 : vw - 16,
            railCenterX: isDesktop ? vw - 30 : vw - 14,
            restScale: isDesktop ? 0.47 : 0.36,
            railScale: isDesktop ? 0.56 : 0.42,
            activeScale: isDesktop ? 0.92 : 0.60,
            wmTargetScale: isDesktop ? 0.22 : 0.38,
            restStep: isDesktop ? 22 : 17,
            dockPassedStep: isDesktop ? 22 : 17,
            dockActiveStep: isDesktop ? 24 : 18
        };
    }

    function measureHudMetrics() {
        cachedVw = window.innerWidth;
        cachedVh = window.innerHeight;
        cachedDocHeight = Math.max(0, document.documentElement.scrollHeight - cachedVh);
        cachedRailHeight = rulerTrack ? rulerTrack.clientHeight : 0;
        cachedSectionTops = hudItems.map((item) => item.el.offsetTop);

        const { rightEdge, restScale, railScale, activeScale } = getHudLayout(cachedVw);

        // Measure natural character widths at 32px font size & precompute offsets
        hudItems.forEach((item) => {
            let total = 0;
            item.chars.forEach((c) => {
                c.span.style.transform = 'translate3d(-9999px, -9999px, 0) scale(1)';
                const rect = c.span.getBoundingClientRect();
                c.width = rect.width || 16;
                total += c.width;
            });
            item.totalWidth = total;

            const n = item.chars.length;
            let accRightRest = 0;
            let accRightActive = 0;
            let accRightPassed = 0;
            item.charOffsets = new Array(n);
            for (let k = n - 1; k >= 0; k--) {
                const w = item.chars[k].width;
                item.charOffsets[k] = {
                    restX: rightEdge - accRightRest - (w * restScale) / 2,
                    activeX: rightEdge - accRightActive - (w * activeScale) / 2,
                    passedX: rightEdge - accRightPassed - (w * restScale) / 2,
                    railOffset: 0
                };
                accRightRest += w * restScale;
                accRightActive += w * activeScale;
                accRightPassed += w * restScale;
            }

            let accRail = 0;
            const totalRailH = total * railScale;
            for (let k = 0; k < n; k++) {
                const w = item.chars[k].width * railScale;
                item.charOffsets[k].railOffset = totalRailH / 2 - (accRail + w / 2);
                accRail += w;
            }
        });

        // Measure Hero wordmark base letter positions at identity transform
        if (heroWordmark && wmLetters.length) {
            wmLetters.forEach((l) => { l.style.transform = 'none'; });
            wmBaseRects = wmLetters.map((l) => {
                const r = l.getBoundingClientRect();
                return {
                    cx: r.left + r.width / 2,
                    cy: r.top + r.height / 2 + window.scrollY,
                    w: r.width,
                    h: r.height
                };
            });
        }
    }

    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const smoothstep = (e0, e1, x) => {
        const t = clamp((x - e0) / (e1 - e0), 0, 1);
        return t * t * (3 - 2 * t);
    };

    function updateChoreography(force = false) {
        const scrollY = lenis ? lenis.scroll : window.scrollY;
        if (!force && Math.abs(scrollY - lastScrollY) < 0.1) {
            return;
        }
        lastScrollY = scrollY;

        const vw = cachedVw;
        const vh = cachedVh;
        const progress = cachedDocHeight > 0 ? clamp(scrollY / cachedDocHeight, 0, 1) : 0;
        const pct = Math.round(progress * 100);

        if (rulerPercent && pct !== lastPct) {
            lastPct = pct;
            rulerPercent.textContent = `${String(pct).padStart(3, '0')}%`;
        }
        if (rulerIndicator) {
            const trackY = progress * Math.max(0, cachedRailHeight - 2);
            rulerIndicator.style.transform = `translate3d(0, ${trackY.toFixed(1)}px, 0)`;
        }

        const layout = getHudLayout(vw);
        const rightEdge = layout.rightEdge;
        const railCenterX = layout.railCenterX;

        // 0. Smooth scroll-linked rotation on full-bleed Hero spiral
        if (heroSpiralSvg && scrollY < 1100) {
            const sTr = `rotate(${(scrollY * 0.045).toFixed(2)}deg)`;
            if (heroSpiralSvg._lastTr !== sTr) {
                heroSpiralSvg._lastTr = sTr;
                heroSpiralSvg.style.transform = sTr;
            }
        }

        // A. Hero Wordmark Morph (Center -> Top-Right Docked with per-letter stagger & arc)
        if (wmLetters.length && wmBaseRects.length === wmLetters.length) {
            const targetScale = layout.wmTargetScale;
            const totalW = wmBaseRects.reduce((acc, b) => acc + b.w * targetScale, 0);
            let cursorX = rightEdge - totalW;
            const targetY = 66;
            const wmCount = wmLetters.length;

            for (let idx = 0; idx < wmCount; idx++) {
                const l = wmLetters[idx];
                const base = wmBaseRects[idx];
                const charTargetX = cursorX + (base.w * targetScale) / 2;
                cursorX += base.w * targetScale;

                // Trailing letters lead slightly into the top-right dock with a subtle arc
                const stagger = ((wmCount - 1 - idx) / Math.max(1, wmCount - 1)) * 90;
                const morphT = smoothstep(30 + stagger * 0.4, 420 + stagger, scrollY);
                const arcRot = Math.sin(morphT * Math.PI) * -10;
                const arcLift = Math.sin(morphT * Math.PI) * -18;

                const flowCx = base.cx;
                const flowCy = base.cy - scrollY;
                const dx = (charTargetX - flowCx) * morphT;
                const dy = (targetY - flowCy) * morphT + arcLift;
                const s = lerp(1, targetScale, morphT);

                const tr = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) rotate(${arcRot.toFixed(1)}deg) scale(${s.toFixed(4)})`;
                if (l._lastTr !== tr) {
                    l._lastTr = tr;
                    l.style.transform = tr;
                }
            }
        }

        // B. 4-Stage Per-Letter Floating Section Navigator (Desktop & Mobile)
        const sectionTops = cachedSectionTops;
        let activeIdx = -1;
        for (let i = 0; i < sectionTops.length; i++) {
            if (scrollY + 180 >= sectionTops[i]) {
                activeIdx = i;
            }
        }
        const activeChanged = activeIdx !== lastActiveIdx;
        lastActiveIdx = activeIdx;

        const restScale = layout.restScale;
        const railScale = layout.railScale;
        const activeScale = layout.activeScale;

        for (let i = 0; i < hudItems.length; i++) {
            const item = hudItems[i];
            const secTop = sectionTops[i];
            const prevTop = i === 0 ? 0 : sectionTops[i - 1];
            const span = Math.max(360, secTop - prevTop);
            const startY = Math.max(60, secTop - span * 0.85);
            const endY = secTop - 160;
            const rawPhase = (scrollY - startY) / Math.max(220, endY - startY);

            const isPassed = i < activeIdx;
            const isActive = i === activeIdx;

            let restOrderFromBottom = 0;
            for (let j = i + 1; j < hudItems.length; j++) {
                const jTop = sectionTops[j];
                const jPrev = sectionTops[j - 1];
                const jStart = Math.max(60, jTop - Math.max(360, jTop - jPrev) * 0.85);
                if (scrollY <= jStart) restOrderFromBottom++;
            }

            const restY = vh - 24 - restOrderFromBottom * layout.restStep;
            const dockedPassedY = 86 + i * layout.dockPassedStep;
            const dockedActiveY = 90 + i * layout.dockActiveStep;

            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            const n = item.chars.length;
            const charOffsets = item.charOffsets;
            const dockShrinkT = isPassed ? smoothstep(sectionTops[i + 1] - 260, sectionTops[i + 1] - 120, scrollY) : 0;
            const passedClass = isPassed && dockShrinkT > 0.5;

            for (let k = 0; k < n; k++) {
                const c = item.chars[k];
                const stagger = ((n - 1 - k) / Math.max(1, n - 1)) * 0.16;
                const p = rawPhase + stagger;

                let x, y, rot, sc;
                if (p <= 0) {
                    x = charOffsets[k].restX;
                    y = restY;
                    rot = 0;
                    sc = restScale;
                } else if (p < 0.35) {
                    const t = smoothstep(0, 0.35, p);
                    const railCenterY = vh - 110;
                    x = lerp(charOffsets[k].restX, railCenterX, t);
                    y = lerp(restY, railCenterY + charOffsets[k].railOffset, t);
                    rot = lerp(0, -90, t);
                    sc = lerp(restScale, railScale, t);
                } else if (p < 0.78) {
                    const t = (p - 0.35) / 0.43;
                    const railY = lerp(vh - 110, 195, t);
                    x = railCenterX;
                    y = railY + charOffsets[k].railOffset;
                    rot = -90;
                    sc = railScale;
                } else if (p < 1.0) {
                    const t = smoothstep(0.78, 1.0, p);
                    x = lerp(railCenterX, charOffsets[k].activeX, t);
                    y = lerp(195 + charOffsets[k].railOffset, dockedActiveY, t);
                    rot = lerp(-90, 0, t);
                    sc = lerp(railScale, activeScale, t);
                } else {
                    const targetScale = lerp(activeScale, restScale, dockShrinkT);
                    x = lerp(charOffsets[k].activeX, charOffsets[k].passedX, dockShrinkT);
                    y = lerp(dockedActiveY, dockedPassedY, dockShrinkT);
                    rot = 0;
                    sc = targetScale;
                }

                if (c.isPassed !== passedClass) {
                    c.isPassed = passedClass;
                    c.span.classList.toggle('is-passed', passedClass);
                }
                const cTr = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${rot.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
                if (c.lastTr !== cTr) {
                    c.lastTr = cTr;
                    c.span.style.transform = cTr;
                }

                const half = (c.width * sc) / 2 + 4;
                if (x - half < minX) minX = x - half;
                if (x + half > maxX) maxX = x + half;
                if (y - 16 < minY) minY = y - 16;
                if (y + 16 > maxY) maxY = y + 16;
            }

            const hitW = Math.max(24, maxX - minX);
            const hitH = Math.max(20, maxY - minY);
            const hTr = `translate3d(${minX.toFixed(1)}px, ${minY.toFixed(1)}px, 0) scale(${hitW.toFixed(1)}, ${hitH.toFixed(1)})`;
            if (item.lastHitTr !== hTr) {
                item.lastHitTr = hTr;
                item.hit.style.transform = hTr;
            }
            if (activeChanged) {
                item.hit.setAttribute('aria-current', isActive ? 'true' : 'false');
            }
        }
    }

    // Measure after fonts are ready, then run smooth rAF loop
    const startLoop = () => {
        measureHudMetrics();
        updateChoreography(true);

        function raf(time) {
            if (lenis) lenis.raf(time);
            updateChoreography(false);
            window.requestAnimationFrame(raf);
        }
        window.requestAnimationFrame(raf);
    };

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(startLoop);
    } else {
        startLoop();
    }

    window.addEventListener('resize', () => {
        measureHudMetrics();
        updateChoreography(true);
    });

    // ------------------------------------------------------------------
    // 7. BLUR + SLIDE REVEAL OBSERVER & FOOTER YEAR
    // ------------------------------------------------------------------
    const revealEls = document.querySelectorAll('[data-reveal]');

    if (prefersReduced || !('IntersectionObserver' in window)) {
        revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
        );
        revealEls.forEach((el) => observer.observe(el));
    }

    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    // Optional ?perf=1 HUD telemetry for real-browser FPS/jank measurement
    if (window.location.search.includes('perf=1')) {
        const badge = document.createElement('div');
        badge.id = 'perfTelemetry';
        badge.style.cssText = 'position:fixed;bottom:12px;left:12px;z-index:9999;padding:8px 12px;background:#0b0b0c;color:#74aaff;border:1px solid #2d81ff;font:11px/1.4 monospace;';
        document.body.appendChild(badge);

        const deltas = [];
        let prevT = performance.now();
        let longTasks = 0;
        if ('PerformanceObserver' in window) {
            try {
                new PerformanceObserver((list) => {
                    longTasks += list.getEntries().length;
                }).observe({ entryTypes: ['longtask'] });
            } catch {}
        }

        function samplePerf(now) {
            const dt = now - prevT;
            prevT = now;
            if (dt > 0 && dt < 500) {
                deltas.push(dt);
                if (deltas.length > 180) deltas.shift();
            }
            if (deltas.length >= 10) {
                const sorted = [...deltas].sort((a, b) => a - b);
                const avg = deltas.reduce((a, b) => a + b, 0) / deltas.length;
                const p95 = sorted[Math.floor(sorted.length * 0.95)];
                const max = sorted[sorted.length - 1];
                const jank33 = deltas.filter((d) => d > 33.3).length;
                badge.textContent = `FPS:${Math.round(1000 / avg)} | avg:${avg.toFixed(1)}ms | p95:${p95.toFixed(1)}ms | max:${max.toFixed(1)}ms | >33ms:${jank33}/${deltas.length} | long:${longTasks}`;
            }
            window.requestAnimationFrame(samplePerf);
        }
        window.requestAnimationFrame(samplePerf);
    }
});
