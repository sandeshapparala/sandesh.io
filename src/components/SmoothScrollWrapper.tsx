'use client';



import {useLenis} from "@/hooks/useLenis";

export default function SmoothScrollWrapper({
                                                children,
                                            }: {
    children: React.ReactNode;
}) {
    useLenis(); // Initialize Lenis for smooth scrolling

    return <>{children}</>;
}
