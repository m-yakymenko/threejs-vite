
import { clearAll, createDotsAndLines, } from '../helpers';
import { createDot } from '../forms/forms';
import { findPathByDijkstraAlgorithm, selectEndDot, selectStartDot } from '../algoritms/dijkstra';


export const Gui = () => {

  const buttons = [
    { label: 'Clear', callback: clearAll },
    { label: 'Add point', callback: createDot },
    { label: 'Create dots & lines', callback: createDotsAndLines },
    { label: 'Find path', callback: findPathByDijkstraAlgorithm },
    { label: 'Select start dot', callback: selectStartDot },
    { label: 'Select end dot', callback: selectEndDot },
  ];

  return (
    <div className="gui">
      {buttons.map(btn => <button onClick={() => btn.callback()}>{btn.label}</button>)}
    </div>
  )
}
