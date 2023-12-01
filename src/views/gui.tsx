
import { clearAll, createRandomDotsAndLines, } from '../helpers'
import { createDot } from '../forms/dot'
import { findPathByDijkstraAlgorithm, selectStartEndDotHelper, setRandomDots } from '../algoritms/dijkstra'
import classNames from 'classnames'
import { useStateStore } from '../store'
import { turnOnDotsConnector } from '../helpers/turnOnDotsConnectorMode'

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
  ]

  return (
    <div className="absolute top-0 right-0 p-2 w-52 flex gap-1 flex-col">
      {buttons.map(btn =>
        <button
          className={classNames('px-0.5', { 'bg-slate-400': btn.turned, 'hover:bg-slate-600 bg-slate-800': !btn.turned })}
          onClick={() => btn.callback()}>
          {btn.label}
        </button>)}
    </div>
  )
}
