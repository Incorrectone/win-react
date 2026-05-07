import { Rnd } from "react-rnd";

export default function WindowFrame({
                                        title,
                                        icon,
                                        defaultPosition,
                                        zaxis,
                                        isMinimized,
                                        onFocus,
                                        onMinimize,
                                        onClose,
                                        children
                                    }) {
    return (
        <Rnd
            style={{
                zIndex: zaxis,
                display: isMinimized ? 'none' : 'block'
            }}
            default={defaultPosition}
            minWidth={300}
            minHeight={200}
            bounds="parent"
            dragHandleClassName="drag-handle"
            onMouseDownCapture={onFocus}
        >
            <div style={{
                display: "flex", flexDirection: "column", height: "100%",
                border: "1px solid #333", backgroundColor: "#c0c0c0",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.5)"
            }}>

                {/* THE TITLE BAR */}
                <div
                    className="drag-handle"
                    style={{
                        backgroundColor: "#000080",
                        color: "white",
                        padding: "5px",
                        cursor: "grab",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {icon && <span>{icon}</span>}
                        <span style={{ fontWeight: 'bold' }}>{title}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '5px' }}>
                        {/* MINIMIZE BUTTON */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onMinimize();
                            }}
                            style={{
                                backgroundColor: '#c0c0c0',
                                border: '2px solid',
                                borderColor: '#ffffff #808080 #808080 #ffffff',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                padding: '0 5px'
                            }}
                        >
                            _
                        </button>

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            style={{
                                backgroundColor: '#c0c0c0',
                                border: '2px solid',
                                borderColor: '#ffffff #808080 #808080 #ffffff',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                padding: '0 5px'
                            }}
                        >
                            X
                        </button>
                    </div>
                </div>

                {/* THE CONTENT AREA */}
                <div style={{ flex: 1, overflow: "auto", backgroundColor: '#fff' }}>
                    {children}
                </div>

            </div>
        </Rnd>
    );
}