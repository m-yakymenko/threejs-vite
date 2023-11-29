
import { clearAll, createRandomDotsAndLines, } from '../helpers';
import { createDot } from '../forms/forms';
import { findPathByDijkstraAlgorithm, selectEndDot, selectStartDot, startWithRandomDots } from '../algoritms/dijkstra';
import classNames from 'classnames';

export const Gui = () => {
  const buttons = [
    { label: 'Clear', callback: clearAll },
    { label: 'Add point', callback: createDot },
    { label: 'Create line btw dots', callback: createDot, turned: false },
    { label: 'Create dots & lines', callback: createRandomDotsAndLines },
    { label: 'Find path', callback: findPathByDijkstraAlgorithm },
    { label: 'Select start dot', callback: selectStartDot },
    { label: 'Select end dot', callback: selectEndDot },
    { label: 'Find with random dots', callback: startWithRandomDots },
  ];

  return (
    <div className="gui">
      {buttons.map(btn =>
        <button
          className={classNames("bg-slate-800 hover:bg-slate-600", { 'bg-slate-400': btn.turned })}
          onClick={() => btn.callback()}>
          {btn.label}
        </button>)}
    </div>
  )
}
