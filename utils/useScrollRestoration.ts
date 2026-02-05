'use client';

import { useEffect } from 'react';

export const useScrollRestoration = (delay: number = 3500) => {
    useEffect(() => {
        const restoreScroll = () => {
            // Priority 1: Check for URL hash (e.g., #about)
            if (window.location.hash) {
                const id = window.location.hash.slice(1);
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'auto' });
                    return;
                }
            }

            // Priority 2: Restore scroll position from session storage
            const savedScrollPos = sessionStorage.getItem('scrollPosition');
            if (savedScrollPos) {
                window.scrollTo({
                    top: parseInt(savedScrollPos),
                    behavior: 'auto'
                });
            }
        };

        const timer = setTimeout(restoreScroll, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            // Use a simple debounce to avoid too many writes to sessionStorage
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                sessionStorage.setItem('scrollPosition', window.scrollY.toString());
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Also save on beforeunload for extra reliability
        const handleBeforeUnload = () => {
            sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            clearTimeout(timeoutId);
        };
    }, []);
};
