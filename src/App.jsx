import { useState } from 'react';
import WindowFrame from './components/WindowFrame';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { appRegistry } from './config/appRegistry';
import { useWindowManager } from './hooks/useWindowManager';
import './App.css';


function App() {
    const {
        openApps,
        bringToFront,
        handleTaskbarDragEnd,
        openWindow,
        minimizeWindow,
        handleTaskbarClick,
        closeWindow } = useWindowManager();

    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

    const handleDesktopClick = () => {
        if (isStartMenuOpen) setIsStartMenuOpen(false);
    };

    return (
        <div
            onClick={handleDesktopClick}
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#008080",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {openApps.map((windowData) => {
                const AppComponent = appRegistry[windowData.appId];
                if (!AppComponent) return null;

                return (
                    <WindowFrame
                        key={windowData.id}
                        title={windowData.title}
                        icon={windowData.icon}
                        defaultPosition={windowData.position}
                        zaxis={windowData.zAxis}
                        isMinimized={windowData.isMinimized}
                        onFocus={() => bringToFront(windowData.id)}
                        onMinimize={() => minimizeWindow(windowData.id)}
                        onClose={() => closeWindow(windowData.id)}
                    >
                        <AppComponent windowId={windowData.id} />
                    </WindowFrame>
                );
            })}


            {isStartMenuOpen && (
                <StartMenu
                    onLaunchApp={openWindow}
                    closeMenu={() => setIsStartMenuOpen(false)}
                />
            )}

            <Taskbar
                openApps={openApps}
                onDragEnd={handleTaskbarDragEnd}
                onAppClick={handleTaskbarClick}
                toggleStartMenu={() => setIsStartMenuOpen(!isStartMenuOpen)}
            />

            <div style={{
                position: 'absolute',
                bottom: '60px',
                right: '20px',
                color: 'rgba(255, 255, 255, 0.45)',
                fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                fontSize: '13px',
                textAlign: 'right',
                zIndex: 99999,
                pointerEvents: 'none',
                userSelect: 'none'
            }}>
                <div style={{ fontWeight: 'bold' }}>porto.theincorrect.one</div>
                <div>A Windows-Like site for Learning React.</div>
                <div>AI(LLMs) were used for help.</div>
            </div>
        </div>
    );
}

export default App;