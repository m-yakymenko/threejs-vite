export const transformControlsTransformingEventName = "TransformControls-transforming"
export const transformControlsTransformingEvent = new Event(transformControlsTransformingEventName);

export const setStartEndDotsEventName = "setStartEndDotsEvent"
export const getSetStartEndDotsEvent = (data: unknown) => new CustomEvent(setStartEndDotsEventName, { detail: data });
