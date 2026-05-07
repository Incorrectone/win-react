import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function TaskbarItem({ app, onClick }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: app.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,


        width: '150px',
        minWidth: '150px',
        flexShrink: 0,
        height: '28px',
        boxSizing: 'border-box',

        padding: '0 10px',
        margin: '0 5px',
        backgroundColor: isDragging ? '#e0e0e0' : '#c0c0c0',
        border: '2px solid',
        borderColor: '#ffffff #808080 #808080 #ffffff',
        cursor: 'grab',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={onClick}>

            <span style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
                textAlign: 'left'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {app.icon && <span>{app.icon}</span>}
                    {app.title}
                </div>
            </span>
        </div>
    );
}