import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface NavigationBarProps {
    children: React.ReactNode;
    rightActions?: React.ReactNode;
    className?: string;
}

/**
 * NavigationBar container component based on Figma Gripstore Design System.
 * Usually placed at the bottom of the screen with a top shadow.
 */
export default function NavigationBar({
    children,
    rightActions,
    className
}: NavigationBarProps) {
    return (
        <div className={twMerge(
            "w-full h-20 bg-white grid relative z-30 shadow-[0_-4px_20px_0_rgba(0,0,0,0.08)]",
            className
        )} style={{ gridTemplateColumns: '1fr 0.5fr' }}>
            {/* Nav Items Section (Left: 1fr) */}
            <div className="flex items-stretch px-6 min-w-0 border-r border-gray-100">
                {children}
            </div>

            {/* Right Actions Section (Right: 0.5fr) */}
            <div className="flex items-center justify-end px-6 min-w-0">
                {rightActions}
            </div>
        </div>
    );
}
