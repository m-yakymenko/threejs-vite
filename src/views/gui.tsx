
import { createRandomDotsAndLines, clearSelection, } from 'src/helpers'
import { createDot } from 'src/forms/dot'
import { findPathByDijkstraAlgorithm, selectStartEndDotHelper, setRandomStartEndDots } from 'src/algoritms/dijkstra'
import classNames from 'classnames'
import { useStateStore } from 'src/store'
import { turnOnDotsConnector } from 'src/helpers/turnOnDotsConnectorMode'
import { graphManager } from 'src/singleton'

export const Gui = () => {
  const isTurnOnDotsConnectorMode = useStateStore((state) => state.isTurnOnDotsConnectorMode)
  const isStartEndDotsSelecting = useStateStore((state) => state.isStartEndDotsSelecting)

  const buttons = [
    { label: 'Delete all', callback: graphManager.clear },
    { label: 'Add point', callback: createDot },
    { label: 'Create line btw dots', callback: () => turnOnDotsConnector(!isTurnOnDotsConnectorMode), turned: isTurnOnDotsConnectorMode },
    { label: 'Add random dots & lines', callback: createRandomDotsAndLines },
    { label: 'Select start-end dots', callback: selectStartEndDotHelper, turned: isStartEndDotsSelecting },
    { label: 'Set random start-end dots', callback: setRandomStartEndDots },
    { label: 'Find path by Dijkstra algorithm', callback: findPathByDijkstraAlgorithm },
    { label: 'Clear selection', callback: clearSelection },
  ]

  return (
    <div className="gui">
      {buttons.map(btn =>
        <button
          className={classNames('p-3 md:p-px grow', { 'bg-slate-400': btn.turned, 'hover:bg-slate-600 bg-slate-800': !btn.turned })}
          onClick={() => btn.callback()}>
          {btn.label}
        </button>)}
    </div>
  )
}
