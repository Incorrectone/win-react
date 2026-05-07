import { useState, useEffect } from 'react';

export function SystemTray() {
    const [network, setNetwork] = useState(navigator.onLine);

    const [battery, setBattery] = useState({ level: 100, charging: true, supported: false, checked: false });
    const [weather, setWeather] = useState({ temp: '...', loading: false });


    useEffect(() => {
        const handleOnline = () => setNetwork(true);
        const handleOffline = () => setNetwork(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);


    useEffect(() => {
        if ('getBattery' in navigator) {
            navigator.getBattery().then((batt) => {
                const updateBattery = () => {
                    setBattery({
                        level: Math.round(batt.level * 100),
                        charging: batt.charging,
                        supported: true,
                        checked: true
                    });
                };
                updateBattery();

                batt.addEventListener('levelchange', updateBattery);
                batt.addEventListener('chargingchange', updateBattery);
            }).catch(() => {

                setBattery(prev => ({ ...prev, supported: false, checked: true }));
            });
        } else {

            setBattery(prev => ({ ...prev, supported: false, checked: true }));
        }
    }, []);


    const fetchWeather = () => {
        setWeather({ temp: '...', loading: true });

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                        const data = await res.json();
                        setWeather({ temp: `${Math.round(data.current_weather.temperature)}°C`, loading: false });
                    } catch (err) {
                        setWeather({ temp: 'Err', loading: false });
                    }
                },
                () => {
                    setWeather({ temp: 'N/A', loading: false });
                }
            );
        } else {
            setWeather({ temp: 'N/A', loading: false });
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '0 10px',
            height: '100%',
            borderLeft: '2px solid #808080',
            marginLeft: 'auto',
            fontSize: '12px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            cursor: 'default',
            userSelect: 'none'
        }}>

            <div title={network ? 'Connected to Internet' : 'Offline'}>
                Net: {network ? 'OK' : 'ERR'}
            </div>

            <div title={battery.supported ? `Battery: ${battery.level}% ${battery.charging ? '(Charging)' : ''}` : 'Battery API not supported in this browser'}>
                Bat: {
                !battery.checked ? '...' :
                    battery.supported ? `${battery.level}% ${battery.charging ? '(AC)' : ''}` :
                        'N/A'
            }
            </div>


            <div
                title="Click to refresh weather"
                onClick={fetchWeather}
                style={{ cursor: 'pointer' }}
            >
                Temp: {weather.loading ? '...' : weather.temp}
            </div>
        </div>
    );
}