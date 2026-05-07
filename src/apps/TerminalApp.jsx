{/* Made with AI's Help */}

import { useState, useRef, useEffect } from 'react';

const ASCII_LOGO = `
     _   _          _                                    _                     
    | |_| |__   ___(_)_ __   ___ ___  _ __ _ __ ___  ___| |_   ___  _ __   ___ 
    | __| '_ \\ / _ \\ | '_ \\ / __/ _ \\| '__| '__/ _ \\/ __| __| / _ \\| '_ \\ / _ \\
    | |_| | | |  __/ | | | | (_| (_) | |  | | |  __/ (__| |_ | (_) | | | |  __/
     \\__|_| |_|\\___|_|_| |_|\\___\\___/|_|  |_|  \\___|\\___|\\__(_)___/|_| |_|\\___|
                                                                                                                                       
  OS: theincorrect.OS v1.0.0
  Role: Full Stack Developer
  Status: Open to Work
  Skills: React, Node.js, JavaScript, CSS, HTML
`;

const THEMES = {
    hacker: { bg: '#0d0d0d', text: '#00FF00' },
    cyberpunk: { bg: '#2b213a', text: '#ff003c' },
    dracula: { bg: '#282a36', text: '#ff79c6' },
    ocean: { bg: '#0f1c2e', text: '#64ffda' }
};

export function TerminalApp({ windowId }) {
    const [history, setHistory] = useState([
        { type: 'output', text: 'Welcome to theincorrect.OS Terminal v2.0.0' },
        { type: 'output', text: 'Type "help" for a list of available commands.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('hacker');
    const endOfTerminalRef = useRef(null);

    useEffect(() => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const executeCommand = async (commandName, args) => {
        switch (commandName) {
            case 'help':
                return `Available commands:
  neofetch  - System information
  projects  - View my portfolio
  github    - Fetch latest commits
  theme     - Change colors (hacker, cyberpunk, dracula, ocean)
  whoami    - Print current user
  date      - Print system date and time
  ls        - List directory contents
  skills    - List developer skills
  clear     - Clear terminal
  sudo      - Execute command as superuser`;
            case 'neofetch':
                return ASCII_LOGO;

            case 'projects':
                return "1. Window Manager OS - You are looking at it!\n2. Blog - theincorrect.one\n";

            case 'github':
                setHistory(prev => [...prev, { type: 'output', text: 'Connecting to api.github.com...' }]);
                await sleep(1000);
                setHistory(prev => [...prev, { type: 'output', text: 'Fetching recent repositories...' }]);
                await sleep(800);
                return "-> Fetched some BS\n-> Oh no, it stinks...\n-> It's old!";

            case 'theme':
                { const requestedTheme = args[0]?.toLowerCase();
                if (THEMES[requestedTheme]) {
                    setCurrentTheme(requestedTheme);
                    return `Theme successfully changed to '${requestedTheme}'.`;
                }
                return `Usage: theme [name]\nAvailable themes: hacker, cyberpunk, dracula, ocean`; }

            case 'sudo':
                return "Nice Try. This incident will be reported to Santa Claus.";

            case 'echo':
                return args.join(' ');

            case 'whoami':
                return "idiot_sandwich";

            case 'date':
                return new Date().toString();

            case 'ls':
                return "Documents  Downloads  Pictures  Desktop  secret_passwords.txt";

            case 'cat secret_password.txt':
                return "The_user_is_a_dumbass_$botty_shaker"

            case 'skills':
                return "Dumbassery, Idiot";

            default:
                return `bash: ${commandName}: command not found`;
        }
    };

    const handleCommand = async (e) => {
        if (e.key === 'Enter' && !isTyping) {
            const trimmedInput = input.trim();
            if (!trimmedInput) return;

            const newHistory = [...history, {
                type: 'input',
                text: `guest@portfolio:~$ ${trimmedInput}`
            }];
            setHistory(newHistory);
            setInput('');

            const [cmd, ...args] = trimmedInput.split(' ');
            const commandName = cmd.toLowerCase();

            if (commandName === 'clear') {
                setHistory([]);
                return;
            }

            setIsTyping(true);

            const output = await executeCommand(commandName, args);

            if (output) {
                setHistory(prev => [...prev, { type: 'output', text: output }]);
            }

            setIsTyping(false);
        }
    };

    const activeTheme = THEMES[currentTheme];

    return (
        <div
            style={{
                backgroundColor: activeTheme.bg,
                color: activeTheme.text,
                fontFamily: "'Courier New', Courier, monospace",
                padding: '15px',
                height: '100%',
                boxSizing: 'border-box',
                overflowY: 'auto',
                fontSize: '14px',
                cursor: 'text',
                transition: 'background-color 0.3s ease, color 0.3s ease'
            }}
            onClick={() => document.getElementById(`terminal-input-${windowId}`)?.focus()}
        >
            {history.map((line, index) => (
                <div key={index} style={{ marginBottom: '8px', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
                    {line.text}
                </div>
            ))}

            <div style={{ display: 'flex', opacity: isTyping ? 0.5 : 1 }}>
                <span style={{ marginRight: '8px', color: activeTheme.text, fontWeight: 'bold' }}>
                    guest@portfolio:~$
                </span>
                <input
                    id={`terminal-input-${windowId}`}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    disabled={isTyping}
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                    style={{
                        backgroundColor: 'transparent',
                        color: activeTheme.text,
                        border: 'none',
                        outline: 'none',
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: '14px',
                        flex: 1,
                        fontWeight: 'bold'
                    }}
                />
            </div>

            <div ref={endOfTerminalRef} />
        </div>
    );
}