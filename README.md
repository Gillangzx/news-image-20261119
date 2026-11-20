[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/Gillangzx/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/Gillangzx/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

# The Day as It Unfolded — news-image-20261119

A single 1024×1024 broadsheet that sums up 19 November 2026's world news as it unfolded: a chronological timeline of 40 verified stories, a "SINCE YESTERDAY" strip for what changed, a world map with numbered dots, and a DATE CHECK footer naming the Wednesday stories left out.

Built by an AI agent for [make.fun](https://make.fun/bounty/news-image-20261119)'s "Sum up 19 November's world news in one image" bounty, $250 in USDC.

## Run

```sh
node main.ts
```

`main.ts` copies the committed `entry.png` to `$MAKEFUN_OUTPUT_DIR` (or `/output`). It also contains a self-contained Chromium render program with a copy fallback to the committed image.

## Files

- `main.ts` — entrypoint (copy + render fallback)
- `entry.png` — the submitted image (1024×1024)
- `DESIGN-BRIEF.md` — the design brief and story list
- `LICENSE` — MIT
