import {useState} from "react";
import { arrayMove } from '@dnd-kit/sortable';

export function useWindowManager() {
    {/*
         {
            id: <int>
            appID: <string> from appRegistry
            title: <string>
            zAxis: <int>
            isMinimized: <boolean>
            position: { { x: 50, y: 50, width: 400, height: 300 } }
            taskbarOrder: <int>
        }
     */}

    const [openApps, setOpenApps] = useState([
        {
            id: 1,
            appId: 'blogapp',
            title: "Blog - theincorrect.one",
            icon: '💻',
            zAxis: 2,
            isMinimized: false,
            position: {  x: 50, y: 50, width: 400, height: 300 },
            taskbarOrder: 1,
        },
        {
            id: 2,
            appId: 'calculator',
            title: "Calculator",
            icon: '🧮',
            zAxis: 1,
            isMinimized: false,
            position: { x: 500, y: 150, width: 300, height: 250 },
            taskbarOrder: 2,
        },
    ]);

    const bringToFront = (id) => {
        setOpenApps((prevApps) => {
            const sortedApps = [...prevApps].sort((a, b) => a.zAxis - b.zAxis);

            const clickedApp = sortedApps.find(app => app.id === id);

            if (!clickedApp) {
                return prevApps;
            }

            const otherApps = sortedApps.filter(app => app.id !== id);

            const newlyOrderedApps = [...otherApps, clickedApp];

            return newlyOrderedApps.map((app, index) => ({
                ...app,
                zAxis: index + 1
            }));
        });
    };

    const handleTaskbarDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setOpenApps((prevApps) => {
            const taskbarSorted = [...prevApps].sort((a, b) => a.taskbarOrder - b.taskbarOrder);

            const oldIndex = taskbarSorted.findIndex((app) => app.id === active.id);
            const newIndex = taskbarSorted.findIndex((app) => app.id === over.id);

            const reordered = arrayMove(taskbarSorted, oldIndex, newIndex);

            return prevApps.map(app => {
                const newOrderIndex = reordered.findIndex(r => r.id === app.id);
                return { ...app, taskbarOrder: newOrderIndex + 1 };
            });
        });
    };

    const openWindow = (appId, title, icon) => {
        setOpenApps((prevApps) => {
            const nextId = prevApps.length > 0 ? Math.max(...prevApps.map(a => a.id)) + 1 : 1;
            const nextZ = prevApps.length > 0 ? prevApps.length + 1 : 1;
            const nextTaskbarOrder = prevApps.length > 0 ? Math.max(...prevApps.map(a => a.taskbarOrder)) + 1 : 1;

            const newApp = {
                id: nextId,
                appId: appId,
                title: title,
                zAxis: nextZ,
                icon: icon,
                isMinimized: false,
                position: { x: 250, y: 50, width: 400, height: 300 },
                taskbarOrder: nextTaskbarOrder,
            };

            return [...prevApps, newApp];
        });
    };

    const minimizeWindow = (id) => {
        setOpenApps((prevApps) => prevApps.map(app =>
            app.id === id ? { ...app, isMinimized: true } : app
        ));
    };

    const handleTaskbarClick = (id) => {
        setOpenApps((prevApps) => {
            const clickedApp = prevApps.find(app => app.id === id);
            if (!clickedApp) return prevApps;

            const maxZ = Math.max(...prevApps.map(a => a.zAxis), 0);
            const isFrontMost = clickedApp.zAxis === maxZ;

            if (isFrontMost && !clickedApp.isMinimized) {
                return prevApps.map(app =>
                    app.id === id ? { ...app, isMinimized: true } : app
                );
            }

            const otherApps = prevApps.filter(app => app.id !== id).sort((a, b) => a.zAxis - b.zAxis);

            return [...otherApps, { ...clickedApp, isMinimized: false }].map((app, index) => ({
                ...app,
                zAxis: index + 1
            }));
        });
    };

    const closeWindow = (id) => {
        setOpenApps((prevApps) => prevApps.filter(app => app.id !== id));
    };

    return {
        openApps,
        bringToFront,
        handleTaskbarDragEnd,
        openWindow,
        minimizeWindow,
        handleTaskbarClick,
        closeWindow
    };
}