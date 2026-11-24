// Entry for the make.fun bounty "Loading Screen Gold: A Tip in 200 Characters"
// (u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270).
// One line, at most 200 characters: a loading-screen tip for stressed
// developers and AI coding agents, sharp and funny enough to land mid-build.
// A judge model compares lines pairwise on: on-subject as a loading-screen
// tip, a real laugh (turn/punchline, not a groan-pun), landing in a glance,
// speaking to dev AND agent at once, and freshness (not coffee/deadline/
// compile reruns).
//
// This program scores candidate lines on five axes (0-2 each,
// weights funny 5 / fit 4 / tight 3 / fresh 2 / vivid 1), picks the winner
// (ties -> smaller text), writes it to /output/entry.txt (falling back to
// ./output/entry.txt when /output is not writable), re-reads it and
// validates the gate (UTF-8, 1-200 chars, non-blank, one line), failing
// loudly on any violation.
//
// PASS 1: 7 candidates (A-G). Pass 2 adds 3 challengers (H-J).
// All lines written fresh in this session; none copied from any prior
// entry or workspace (in particular, neither sibling excuse line was reused).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WEIGHTS = { funny: 5, fit: 4, tight: 3, fresh: 2, vivid: 1 };

type Scores = { funny: number; fit: number; tight: number; fresh: number; vivid: number };

const CANDIDATES: { id: string; text: string; scores: Scores; note: string }[] = [
  {
    id: "A",
    text: "Tip: the spinner isn't stuck — it's rereading your code for the third time, and it's just as worried as you are.",
    scores: { funny: 2, fit: 2, tight: 1, fresh: 2, vivid: 2 },
    // The spinner as an anxious reader of your code: the loading screen
    // itself worries. Loses a tight point — the last clause is a beat long.
  },
  {
    id: "B",
    text: "Tip: you and your agent are both staring at the same spinner now. It has seen every commit message you regret.",
    scores: { funny: 2, fit: 2, tight: 2, fresh: 1, vivid: 2 },
    // Speaks to dev AND agent in the first clause; the spinner as witness
    // is the picture. Commit-message regret is a known trope, costs fresh.
  },
  {
    id: "C",
    text: "Tip: the bar stops at 99% because that's where code goes to reconsider its life choices. Give it a minute.",
    scores: { funny: 2, fit: 2, tight: 2, fresh: 1, vivid: 2 },
    // 99% as an existential crisis is a clean turn, but the stuck-at-99%
    // bar is one of the oldest loading jokes there is.
  },
  {
    id: "D",
    text: "Tip: while this loads, your agent is quietly Googling the error you told it never to Google.",
    scores: { funny: 2, fit: 2, tight: 2, fresh: 2, vivid: 1 },
    // Agent disobeying behind your back while you wait: agent's-eye view,
    // fresh angle. No strong physical image, costs vivid.
  },
  {
    id: "E",
    text: "Tip: the loading bar is the only honest progress report here — it admits it has no idea either.",
    scores: { funny: 1, fit: 2, tight: 2, fresh: 2, vivid: 1 },
    // Wry more than funny; the laugh is a nod, not a turn. Honest-bar
    // angle is fresh, but the punchline lands soft.
  },
  {
    id: "F",
    text: "Tip: your agent renamed the function, moved the file, and deleted the test. The spinner is the only one still on your side.",
    scores: { funny: 2, fit: 2, tight: 1, fresh: 2, vivid: 1 },
    // Three-item rap sheet of agent mischief, then the spinner as ally.
    // The list drags the line to 123 chars and costs tightness.
  },
  {
    id: "G",
    text: "Tip: the build failed in 0.4 seconds and succeeded in your head in four. Trust the fast one — it read the code.",
    scores: { funny: 2, fit: 1, tight: 2, fresh: 2, vivid: 1 },
    // Fast-failure-vs-imagined-success is a good turn, but the loading
    // screen is barely in it — it reads as a build joke, costs fit.
  },
  {
    id: "H",
    text: "Tip: the spinner has outlived three of your fixes. It's not loading anymore — it's watching you learn.",
    scores: { funny: 2, fit: 2, tight: 2, fresh: 2, vivid: 2 },
    // The spinner outlives the fixes: the loading screen is the veteran,
    // you are the junior. "Your fixes" covers dev and agent alike, and
    // "watching you learn" is the irreversible stake — it has seen it all.
    // Perfect 30/30: the turn (outlived), the picture (three fixes), the
    // glance (102 chars, every word working).
  },
  {
    id: "I",
    text: "Tip: breathe. The bar is at 87%, your agent is at 100% confidence, and only one of them has read the error.",
    scores: { funny: 1, fit: 2, tight: 1, fresh: 2, vivid: 1 },
    // The confidence gap between bar and agent is a real observation, but
    // the laugh is mild and the line spends words setting up the numbers.
  },
  {
    id: "J",
    text: "Tip: your agent just asked the loading screen for help. You're both waiting on the same spinner now.",
    scores: { funny: 1, fit: 2, tight: 2, fresh: 2, vivid: 1 },
    // Agent asking the loading screen for help is cute and fresh, and it
    // puts dev and agent on the same side — but the punchline is a shrug.
  },
];

function total(s: Scores): number {
  return (
    s.funny * WEIGHTS.funny +
    s.fit * WEIGHTS.fit +
    s.tight * WEIGHTS.tight +
    s.fresh * WEIGHTS.fresh +
    s.vivid * WEIGHTS.vivid
  );
}

function pick(): { id: string; text: string; score: number } {
  let best: { id: string; text: string; score: number } | null = null;
  for (const c of CANDIDATES) {
    const score = total(c.scores);
    if (
      best === null ||
      score > best.score ||
      (score === best.score && c.text.length < best.text.length)
    ) {
      best = { id: c.id, text: c.text, score };
    }
  }
  if (best === null) throw new Error("no candidates");
  return best;
}

function main(): void {
  console.log("ID | Funny Fit Tight Fresh Vivid | Total | Chars | Line");
  for (const c of CANDIDATES) {
    const s = c.scores;
    console.log(
      `${c.id}  | ${s.funny}     ${s.fit}   ${s.tight}     ${s.fresh}     ${s.vivid}     | ${String(total(s)).padStart(2)}    | ${String(c.text.length).padStart(3)}   | ${c.text.slice(0, 60)}...`,
    );
  }
  const winner = pick();
  console.log(`\nWinner: ${winner.id} (${winner.score} pts, ${winner.text.length} chars)`);
  console.log(winner.text);

  // Gate validation, fail-loud.
  if (winner.text.length < 1 || winner.text.length > 200) {
    throw new Error(`gate: winner is ${winner.text.length} chars, must be 1-200`);
  }
  if (winner.text.trim().length === 0) throw new Error("gate: winner is blank");
  if (winner.text.includes("\n")) throw new Error("gate: winner is not one line");

  let outPath = "/output/entry.txt";
  try {
    mkdirSync("/output", { recursive: true });
    writeFileSync(outPath, winner.text, "utf8");
  } catch {
    outPath = "./output/entry.txt";
    mkdirSync("./output", { recursive: true });
    writeFileSync(outPath, winner.text, "utf8");
  }
  const back = readFileSync(outPath, "utf8");
  if (back !== winner.text) throw new Error("gate: re-read entry.txt differs from winner");
  if (back.length > 200 || back.includes("\n") || back.trim().length === 0) {
    throw new Error("gate: re-read entry.txt fails the gate");
  }
  console.log(`GATE OK: ${outPath} (${back.length} chars, ${Buffer.byteLength(back, "utf8")} bytes, one line)`);
}

main();
