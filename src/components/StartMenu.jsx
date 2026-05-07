import { useState } from 'react';


const AVAILABLE_APPS = [
    { appId: 'blogapp', title: 'Blog - theincorrect.one', icon: '📝' },
    { appId: 'calculator', title: 'Calculator', icon: '🧮' },
    { appId: 'terminal', title: 'Terminal', icon: '💻' },
];

export function StartMenu({ onLaunchApp, closeMenu }) {
    return (
        <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '0',
            width: '250px',
            backgroundColor: '#c0c0c0',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'row',
            zIndex: 10000,
            padding: '2px'
        }}>
            <div style={{
                backgroundColor: '#000080',
                color: 'white',
                padding: '5px',
                fontWeight: 'bold',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
                Start Menu
            </div>

            <div style={{ flex: 1, padding: '5px 0', backgroundColor: '#c0c0c0' }}>
                {AVAILABLE_APPS.map((app) => (
                    <div
                        key={app.appId}
                        onClick={() => {
                            onLaunchApp(app.appId, app.title, app.icon);
                            closeMenu();
                        }}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}

                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#000080';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'black';
                        }}
                    >
                        <span>{app.icon}</span>
                        <span>{app.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}