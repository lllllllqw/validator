// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...

interface ValidFunc {
  (value: any): boolean
}

interface ValidatorRule {
  func: ValidFunc
  errMsg: string
}

export default class Validator {
  private ruleQueue: ValidatorRule[]

  constructor () {
    this.ruleQueue = []
  }

  private normalizeRules(rules: ValidFunc | ValidFunc[], errMsg: string): ValidatorRule[] {
    if(typeof rules === 'function') {
      return [{
        errMsg,
        func: rules,
      }]
    } else {
      return rules.map((rule) => ({
        errMsg,
        func: rule,
      }))
    }
  }

  public add (rules: ValidFunc | ValidFunc[], errMsg: string) {
    this.ruleQueue.push(...this.normalizeRules(rules, errMsg))
    return this
  }

  public run (value: any): string | null {
    for(const rule of this.ruleQueue) {
      const isErr = !rule.func(value)
      if(isErr) {
        return rule.errMsg
      }
    }
    return null
  }
}
