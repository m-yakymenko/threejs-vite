import { type ColorRepresentation } from 'three'

export const GROUP_LINES_NAME = "linesGroup"
export const GROUP_DOTS_NAME = "dotsGroup"

export const COLOR = {
  DOT: 'bisque',
  LINE: 'cadetblue',
  SUCCESS: 'green',
  LINE_CHECKED: 'red',
  DOT_SELECTED: 'brown',
  DOT_HOVERED: 'chartreuse',
  DOT_START: 'blue',
  DOT_END: 'yellow',
} as const satisfies { [key: string]: ColorRepresentation }
