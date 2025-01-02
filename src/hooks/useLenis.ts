// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.6,
            easing: (t) => t,

            // @ts-ignore

            direction: 'vertical',
            smoothTouch: true,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        // Smooth scrolling on anchor link click
        const handleAnchorClick = (event: Event) => {
            const target = event.target as HTMLAnchorElement;
            if (target.hash) {
                event.preventDefault();
                const section = document.querySelector(target.hash);
                if (section) {

                    // @ts-ignore
                    lenis.scrollTo(section);
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            lenis.destroy();
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);
};
