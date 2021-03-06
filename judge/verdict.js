const VerdictConst = {
  "": "won't be judged",
  VERDICT_INQ: "in queue",
  VERDICT_SKIP: "skipped",

  VERDICT_WA: "wrong answer",
  VERDICT_RTE: "runtime error",
  VERDICT_MLE: "memory limit exceeded",
  VERDICT_TLE: "time limit exceeded",
  VERDICT_WTE: "walltime limit exceeded",
  VERDICT_OLE: "output limit exceeded",

  VERDICT_CE: "compilation error",
  VERDICT_CTE: "compilation timed out",

  VERDICT_FAIL: "checker failed",
  VERDICT_CHTE: "checker timed out",

  VERDICT_JE: "judge crashed",
  VERDICT_UE: "unknown error",

  VERDICT_AC: "accepted"
};

const VerdictTag = {
  "": "white",
  VERDICT_INQ: "light",
  VERDICT_SKIP: "dark",

  VERDICT_WA: "danger",
  VERDICT_RTE: "danger",
  VERDICT_MLE: "danger",
  VERDICT_TLE: "danger",
  VERDICT_WTE: "danger",
  VERDICT_OLE: "danger",

  VERDICT_CE: "warning",
  VERDICT_CTE: "warning",

  VERDICT_FAIL: "info",
  VERDICT_CHTE: "info",

  VERDICT_JE: "black",
  VERDICT_UE: "black",

  VERDICT_AC: "success"
};

const VerdictGhost = {
  "": "RJ",
  VERDICT_INQ: "RJ",
  VERDICT_SKIP: "RJ",

  VERDICT_WA: "WA",
  VERDICT_RTE: "RT",
  VERDICT_MLE: "RT",
  VERDICT_TLE: "TL",
  VERDICT_WTE: "TL",
  VERDICT_OLE: "RT",

  VERDICT_CE: "CE",
  VERDICT_CTE: "CE",

  VERDICT_FAIL: "RJ",
  VERDICT_CHTE: "RJ",

  VERDICT_JE: "RJ",
  VERDICT_UE: "RJ",

  VERDICT_AC: "OK"
};


class Verdict {
  constructor(score, verdict, passed = -1, info = {}) {
    this.score = score || 0;
    this.verdict = verdict;
    this.passed = passed;
    this.info = {};
    if (typeof info === "string")
      Object.assign(this.info, { text: info });
    else
      Object.assign(this.info, info || {});
  }

  wasExecuted() {
    return this.passed >= 0;
  }

  getTextInfo() {
    return this.info.text || "";
  }

  getVerdictCode() {
    return this.verdict;
  }

  getVerdictText() {
    return VerdictConst.hasOwnProperty(this.verdict)
      ? VerdictConst[this.verdict]
      : this.verdict;
  }

  getScore() {
    return this.score;
  }

  getPassed() {
    return Math.max(0, this.passed);
  }

  toJSON() {
    return {
      score: this.score,
      verdict: this.verdict,
      passed: this.passed,
      info: this.info
    };
  }

  static fromJSON(json) {
    return new Verdict(json.score || 0, json.verdict, json.passed || -1, json.info || {});
  }
}

module.exports = {
  Verdict,
  VerdictConst,
  VerdictTag,
  VerdictGhost
};
