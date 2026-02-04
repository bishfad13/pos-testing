import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface NavigationBarItemProps {
    label: string;
    icon?: React.ReactNode;
    showIcon?: boolean;
    isActive?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    badge?: number;
    className?: string;
}

/**
 * NavigationBarItem component based on Figma Gripstore Design System.
 * Features a top indicator bar for the active state.
 */
export default function NavigationBarItem({
    label,
    icon,
    showIcon = true,
    isActive = false,
    disabled = false,
    onClick,
    badge,
    className
}: NavigationBarItemProps) {
    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={twMerge(
                "group relative flex flex-col h-[80px] min-w-[100px] items-center justify-between transition-all",
                isActive ? "bg-white" : "hover:bg-[var(--color-nav-hover)] active:bg-[var(--color-nav-pressed)]",
                disabled && "opacity-40 cursor-not-allowed grayscale-[0.5] pointer-events-none",
                className
            )}
        >
            {/* Top Indicator */}
            <div
                className={twMerge(
                    "h-[2px] w-full transition-all shrink-0",
                    isActive ? "bg-[var(--color-nav-active)]" : "bg-transparent group-hover:bg-gray-100",
                    disabled && "group-hover:bg-transparent"
                )}
            />

            {/* Content Area */}
            <div className="flex-1 flex items-center justify-center gap-2 px-4 relative w-full">
                {showIcon && icon && (
                    <div className="relative">
                        <div className={twMerge(
                            "size-6 flex items-center justify-center transition-colors",
                            isActive ? "text-[var(--color-nav-active)]" : "text-[var(--color-text-tertiary)]"
                        )}>
                            {icon}
                        </div>

                        {/* Badge */}
                        {badge !== undefined && badge > 0 && (
                            <div className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[var(--color-badge-bg)] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
                                {badge > 99 ? '99+' : badge}
                            </div>
                        )}
                    </div>
                )}

                <span className={twMerge(
                    "text-sm font-semibold tracking-tight transition-colors",
                    isActive ? "text-[var(--color-nav-active)]" : "text-[var(--color-text-tertiary)]"
                )}>
                    {label}
                </span>
            </div>
        </button>
    );
}
