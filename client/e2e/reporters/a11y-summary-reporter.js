import {
  resetReportStore,
  writeFinalReports,
} from "../helpers/report-store.js";

/**
 * Playwright reporter that seeds the axe scan store and writes
 * machine-readable + human-readable accessibility summaries on exit.
 */
class A11ySummaryReporter {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.skipped = 0;
    this.flaky = 0;
  }

  onBegin(_config, suite) {
    resetReportStore({
      suiteTitle: suite.title || "accessibility",
    });
  }

  onTestEnd(test, result) {
    const status = result.status;
    if (status === "passed") this.passed += 1;
    else if (status === "skipped") this.skipped += 1;
    else if (status === "interrupted") this.skipped += 1;
    else this.failed += 1;
    if (result.status === "flaky" || (result.retry > 0 && status === "passed")) {
      this.flaky += 1;
    }
  }

  onEnd(result) {
    writeFinalReports({
      testSummary: {
        status: result.status,
        passed: this.passed,
        failed: this.failed,
        skipped: this.skipped,
        flaky: this.flaky,
        durationMs: result.duration,
      },
    });
  }
}

export default A11ySummaryReporter;
