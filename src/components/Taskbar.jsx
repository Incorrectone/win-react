import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskbarItem } from './TaskbarItem';
import { SystemTray } from './SystemTray';

export function Taskbar({ openApps, onDragEnd, onAppClick, toggleStartMenu }) {
    const taskbarApps = [...openApps].sort((a, b) => a.taskbarOrder - b.taskbarOrder);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    return (
        <div style={{
            position: 'absolute',
            bottom: '-1px',
            left: 0,
            width: '100%',
            height: '41px',
            boxSizing: 'border-box',
            backgroundColor: '#c0c0c0',
            borderTop: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
            zIndex: 9999
        }}>


            <button
                onClick={toggleStartMenu}
                style={{
                    marginRight: '15px',
                    fontWeight: 'bold',
                    padding: '2px 8px',
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: '#ffffff #808080 #808080 #ffffff',
                    backgroundColor: '#c0c0c0',
                    flexShrink: 0
                }}
            >
                Start
            </button>


            <div className="taskbar-apps-container" style={{
                display: 'flex',
                flex: 1,
                overflowX: 'auto',
                overflowY: 'hidden',
                alignItems: 'center',
                height: '100%',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>

                <style>
                    {`
                    .taskbar-apps-container::-webkit-scrollbar {
                        display: none;
                    }
                    `}
                </style>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                    <SortableContext items={taskbarApps.map(app => app.id)} strategy={horizontalListSortingStrategy}>
                        {taskbarApps.map((app) => (
                            <TaskbarItem key={app.id} app={app} onClick={() => onAppClick(app.id)} />
                        ))}
                    </SortableContext>
                </DndContext>

                <SystemTray />

            </div>
        </div>
    );
}