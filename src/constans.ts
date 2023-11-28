export const LINE_ELEMENTS_TYPE = ["LineSegments", "Line", 'GridHelper', "TransformControls"]
export const MESH_ELEMENTS_TYPE = ["Mesh",]

export const GROUP_LINES_NAME = "linesGroup"
export const GROUP_DOTS_NAME = "dotsGroup"

export const COLOR = {
  DOT: 'bisque',
  LINE: 'cadetblue',
  LINE_PATH_TO_END: 'green',
  LINE_CHECKED: 'red',
  DOT_SELECTED: 'brown',
  DOT_HOVERED: 'chartreuse',
  DOT_START: 'blue',
  DOT_END: 'yellow',
} as const satisfies { [key: string]: THREE.ColorRepresentation }
