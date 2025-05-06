export class FocusService {
  private static CURRENT_FOCUS: string | null = null

  static get () {
    return this.CURRENT_FOCUS
  }

  static set (focus: string) {
    this.CURRENT_FOCUS = focus.length ? focus : null
  }
}
