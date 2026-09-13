/* =========================================================
   AshNoise 作品集数据配置
   修改作品信息/分类/书本页面内容，主要改这个文件即可
   ========================================================= */
window.PORTFOLIO = {
  heroBg: [
    "assets/hero-bg.jpg",
    "assets/hero/destiny-1.jpg", "assets/hero/re9-1.jpg", "assets/hero/plague-1.jpg", "assets/hero/oresa-1.jpg", "assets/hero/sifu-1.jpg",
    "assets/hero/destiny-2.jpg", "assets/hero/re9-2.jpg", "assets/hero/plague-2.jpg", "assets/hero/oresa-2.jpg", "assets/hero/sifu-2.jpg",
    "assets/hero/destiny-3.jpg", "assets/hero/re9-3.jpg", "assets/hero/plague-3.jpg", "assets/hero/oresa-3.jpg", "assets/hero/sifu-3.jpg"
  ],
  heroInterval: 6000,
  daily: [
    {
      name: "Live 策划",
      en: "Live Planning",
      files: [
        "assets/daily/live-plan/lp-01.jpg", "assets/daily/live-plan/lp-02.jpg", "assets/daily/live-plan/lp-03.jpg",
        "assets/daily/live-plan/lp-04.jpg", "assets/daily/live-plan/lp-05.jpg", "assets/daily/live-plan/lp-06.jpg",
        "assets/daily/live-plan/lp-07.jpg", "assets/daily/live-plan/lp-08.jpg", "assets/daily/live-plan/lp-09.jpg",
        "assets/daily/live-plan/lp-10.jpg"
      ]
    },
    {
      name: "Live 现场",
      en: "Live On-site",
      files: [
        "assets/daily/live-scene/ls-01.jpg", "assets/daily/live-scene/ls-02.jpg",
        "assets/daily/live-scene/ls-03.jpg", "assets/daily/live-scene/ls-04.jpg"
      ]
    },
    {
      name: "工作日常",
      en: "Workday",
      files: [
        "assets/daily/work/wk-01.jpg", "assets/daily/work/wk-02.jpg", "assets/daily/work/wk-03.jpg",
        "assets/daily/work/wk-04.jpg", "assets/daily/work/wk-05.jpg"
      ]
    }
  ],
  categories: [
    { id: "sfx",       name: "游戏实机音效重制",         en: "SFX · Sound Effect Design" },
    { id: "audio-plan",name: "游戏音频策划设计",      en: "Audio Direction · Planning" },
    { id: "synth-ui",  name: "合成器 / UI 音效设计", en: "Synth & UI Sound Design" },
    { id: "cg",        name: "CG 音效设计",       en: "CG Trailer Sound Design" },
    { id: "wwise",     name: "Wwise / UE5 音频集成",  en: "Wwise · Unreal Engine 5 Integration" }
  ],

  works: [
    {
      id: "re9",
      title: "《生化危机9》",
      cat: "sfx",
      dur: "2:51",
      desc: "强冲击与危机压迫：鹪木市丧尸爆发雨夜中的枪械手感、命中反馈与街道张力。",
      video: "video/AshNoise-生化危机9.mp4",
      poster: "video/posters/AshNoise-生化危机9.jpg",
      source: "https://pan.baidu.com/s/1PAvey34ZGFf1jw0sae3NbA?pwd=dzv6",
      shot: "docs/re9/shot.jpg",

      conceptTitle: "生化危机9 · 声音设计理念",
      concept: "这段声音以“强冲击与危机压迫”为目标。此章节设定在鹪木市丧尸爆发的雨夜，男主以射击为主要手段在持续威胁中求生，其快感来自枪械手感与每一次命中反馈。我通过击发、机械与滑套等层次共同构建枪声的力度与细节，并以清晰的血肉与骨骼声强化命中瞬间；雨、车流、警笛与雷声构成贯穿始终的街道氛围，维持“随时可能出事”的张力，结尾的车辆撞击则以金属、玻璃与爆炸完成情绪释放。整体力求在明确的打击反馈与持续的危机感之间取得平衡。"
    },
    {
      id: "sifu",
      title: "《师父》",
      cat: "sfx",
      dur: "1:02",
      desc: "以“扎实而克制”的动作质感构建格斗打击层次：身体命中 / 表层拍击 / 挥击风声。",
      video: "video/师父.mp4",
      poster: "video/posters/师父.jpg",
      source: "https://pan.baidu.com/s/1PAvey34ZGFf1jw0sae3NbA?pwd=dzv6",
      shot: "docs/sifu/shot.jpg",

      conceptTitle: "师父 · 声音设计理念",
      concept: "《师父》这段声音我追求“扎实而克制”的动作质感。游戏以复仇为母题，格斗是核心玩法，强调招架、闪避与连段节奏，以弱胜强构成主要爽感。我以身体命中、表层拍击与挥击风声三个层次构建每一次打击，使其兼具重量与速度，并对主角与敌人的打击音色加以区分，维持战斗中的信息清晰。场景层面仅用室内空气克制的处理而建立塔楼氛围，给精彩的打斗声留足空间，整体保持电影化的克制，而非夸张。"
    },
    {
      id: "plague",
      title: "《瘟疫传说》",
      cat: "audio-plan",
      dur: "0:52",
      desc: "写实取向的中世纪沉浸氛围：以环境与拟音的真实性构建“被世界包围”的体验。",
      video: "video/AshNoise-瘟疫传说.mp4",
      poster: "video/posters/AshNoise-瘟疫传说.jpg",
      source: "https://pan.baidu.com/s/1PAvey34ZGFf1jw0sae3NbA?pwd=dzv6",
      shot: "docs/plague/shot.jpg",
      plan: {
        label: "策划案",
        file: "docs/plague/策划案.xmind",
        dlLabel: ".xmind 原件",
        images: ["docs/plague/plan.png"],
        cssw: 2782,
        caption: "音频策划案 · XMind 思维导图（原图）"
      },

      conceptTitle: "瘟疫传说 · 声音设计理念",
      concept: "在《瘟疫传说》这段声音里，我以“写实”为总体取向。游戏发生在黑死病肆虐的中世纪，玩家始终处于姐弟逃亡、混迹人群与环境之中的紧张状态，体验重心不在战斗反馈，而在身临其境的氛围与压迫感。因此我把声音着力于环境与拟音的真实性：以人群、牲畜、铁匠与风声构成多层次的环境底噪，用贴合动作的写实脚步与布料声呈现角色的移动，让空间足够可信、节奏保持沉缓，使“被世界包围”的沉浸成为这段声音的核心体验。"
    },
    {
      id: "zzz",
      title: "《绝区零》",
      cat: "synth-ui",
      dur: "0:23",
      desc: "为《绝区零》风格界面与交互反馈设计的合成器 / UI 音效 Demo。",
      video: "video/绝区零_合成器ui.mp4",
      poster: "video/posters/绝区零_合成器ui.jpg",
      source: "https://pan.baidu.com/s/1PAvey34ZGFf1jw0sae3NbA?pwd=dzv6",
      shots: [
        "docs/zzz/shot-01.jpg", "docs/zzz/shot-02.jpg", "docs/zzz/shot-03.jpg",
        "docs/zzz/shot-04.jpg", "docs/zzz/shot-05.jpg", "docs/zzz/shot-06.jpg",
        "docs/zzz/shot-07.jpg", "docs/zzz/shot-08.jpg", "docs/zzz/shot-09.jpg"
      ],
      conceptTitle: "绝区零 · UI · 声音设计理念",
      concept: "绝区零作为一款经典二游，其音效设计需要与游戏整体的视觉深度绑定，游戏大量汲取 2000 年左右的流行文化，所以在整体 UI 音效的设计上我选择尽可能的给到未来但又复古的感觉。让声音总体感觉 Q 弹，也蕴含一些复古物件的发声质感。"
    },
    {
      id: "oresa",
      title: "《奥雷萨之下》",
      tag: "UI 音效设计",
      cat: "synth-ui",
      dur: "1:27",
      desc: "卡牌构筑的策略感 × 回合格斗的爆发感：合成器音色、虫群电弧与界面反馈分层。",
      video: "video/AshNoise-奥雷萨之下.mp4",
      poster: "video/posters/AshNoise-奥雷萨之下.jpg",
      source: "https://pan.baidu.com/s/1PAvey34ZGFf1jw0sae3NbA?pwd=dzv6",
      shot: "docs/oresa/shot.jpg",

      conceptTitle: "奥雷萨之下 · 声音设计理念",
      concept: "在《奥雷萨之下》这段声音中，我以“卡牌构筑的策略感与回合格斗的爆发感并重”为取向。要谨慎地通过选牌、升级与秘物构筑卡组，是 Rogue 与卡牌、回合制战术的复合体验。因此我把声音分成互有落差的几层：洗牌、出牌与界面反馈传递卡组操作的“策略手感”；攻击、命中与喷血等反馈提供果断而利落的打击体验；怪物与能量体系则以嗡鸣、虫群与电弧渲染对手的威胁与压迫。声音在操作的克制感与战斗的爆发感之间形成对比，以贴合“谋定后动、贴身制敌”的玩法节奏。"
    },
    {
      id: "destiny",
      title: "《命运2：遗落之族》CG",
      cat: "cg",
      dur: "1:40",
      desc: "一镜到底 CG 的氛围渲染与叙事延续：空洞底噪、传送门轰鸣与压迫感递进。",
      video: "video/AshNoise-命运2-遗落之族cg.mp4",
      poster: "video/posters/AshNoise-命运2-遗落之族cg.jpg",
      source: "https://pan.baidu.com/s/1PAvey34ZGFf1jw0sae3NbA?pwd=dzv6",
      shot: "docs/destiny/shot.jpg",
      req: [],
      conceptTitle: "命运2 · 遗落之族 CG · 声音设计理念",
      concept: "这段是命运2故事线中比较重要的一个章节的cg。整体比较沉闷压抑，在环境上应用空洞的底噪，传送门的轰鸣声来将整个氛围沉下去，紧接着给到机灵灵动的音效，和突兀的枪声，来形成对比，让观众进入剧情当中，而后的反派出现给到沉重的脚步声，再一次强调压迫感，荒凉感，最后的走向传送门的镜头将声音主体给到传送门，来引发大家对后续剧情的联想。这条cg用了一镜到底的手法，所以音效在设计上就尽可能的贴合镜头给到的画面，设计重点在于氛围的渲染和情节的延续。"
    },
    {
      id: "ue-wwise",
      title: "UE 开放世界 Demo · Wwise 集成",
      hideConcept: true,
      cat: "wwise",
      dur: "1:54 / 2:04",
      desc: "基于 Unreal Engine + Wwise 的开放世界主关卡音频集成：脚步地表 Switch、火球事件链、收音机与环境、人声防叠与 3D 衰减（30 个 Wwise Events）。",
      videos: [
        { label: "工程 Demo（实机）", src: "video/ue工程demo.mp4", poster: "video/posters/ue工程demo.jpg" },
        { label: "Wwise × UE5 集成详解", src: "video/wwise与ue5集成详解.mp4", poster: "video/posters/wwise与ue5集成详解.jpg" }
      ],
      video: "video/ue工程demo.mp4",
      poster: "video/posters/ue工程demo.jpg",
      req: ["docs/ue/req-01.png"],
      cert: {
        label: "Wwise 证书",
        image: "docs/wwise/cert.png",
        cssw: 1500,
        caption: "Wwise Fundamentals · Certified End User（Audiokinetic · 2026.09）"
      },
      conceptTitle: "UE 工程 · Wwise 集成说明",
      concept: "范围：仅主关卡 open_world_LSP_demo，Wwise 工程为 Salt3rd_WwiseProject。\nWwise 现状：Events 共 30 个（含 Footstep、Radio_Play_Stop）；脚步 Switch Group Surface（Grass / Dirt / Wood / Water）；火球事件内已做 Stop 链；人声容器限 1 实例。\n火球播放序列：Cast 蓄能（持续）→ Shoot（内部先 Stop Cast 再播）→ Blast（内部先 Stop Shoot 再播），UE 只需按节奏 Post 三个事件。\n脚步播放：SetSwitch(Surface, 地表) + Post Footstep，原 4 个地表事件已并入。\n收音机播放：开 = Radio_Toggle + Radio_Play；关 = Radio_Toggle + Radio_Play_Stop（由 UE 判断开关状态）。\n人声防叠：VO_Player_Hurt / VO_Player_Grunt 已设 Limit=1，新声自动打断旧声。\n制作状态：未开始 / 制作中 / 已制作 / 已导入 / 已验收。"
    }
  ]
};