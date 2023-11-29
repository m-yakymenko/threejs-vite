
import { clearAll, createRandomDotsAndLines, } from '../helpers';
import { createDot } from '../forms/forms';
import { findPathByDijkstraAlgorithm, selectStartEndDotHelper, setRandomDots } from '../algoritms/dijkstra';
import classNames from 'classnames';
import { useStateStore } from '../store';
import { turnOnDotsConnector } from '../helpers/turnOnDotsConnectorMode';

export const Gui = () => {
  const isTurnOnDotsConnectorMode = useStateStore((state) => state.isTurnOnDotsConnectorMode)
  const isStartEndDotsSelecting = useStateStore((state) => state.isStartEndDotsSelecting)

  const buttons = [
    { label: 'Clear', callback: clearAll },
    { label: 'Add point', callback: createDot },
    { label: 'Create line btw dots', callback: () => turnOnDotsConnector(!isTurnOnDotsConnectorMode), turned: isTurnOnDotsConnectorMode },
    { label: 'Add random dots & lines', callback: createRandomDotsAndLines },
    { label: 'Select start-end dots', callback: selectStartEndDotHelper, turned: isStartEndDotsSelecting },
    { label: 'Set random start-end dots', callback: setRandomDots },
    { label: 'Find path', callback: findPathByDijkstraAlgorithm },
  ];

  return (
    <div className="gui">
      {buttons.map(btn =>
        <button
          className={classNames("bg-slate-800", { 'bg-slate-400': btn.turned, 'hover:bg-slate-600': !btn.turned })}
          onClick={() => btn.callback()}>
          {btn.label}
        </button>)}
    </div>
  )
}
