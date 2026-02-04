import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export interface AppBarProps {
    title: string;
    subtitle?: string;
    leading?: React.ReactNode;
    onBack?: () => void;
    trailing?: React.ReactNode;
    children?: React.ReactNode;
    variant?: 'small' | 'medium' | 'large';
    className?: string;
}

/**
 * AppBar component updated to match Gripstore Design System.
 */
export default function AppBar({
    title,
    subtitle,
    leading,
    onBack,
    trailing,
    children,
    variant = 'small',
    className
}: AppBarProps) {

    const variantStyles = {
        small: 'h-16 py-2',
        medium: 'h-28 py-4',
        large: 'h-32 py-6',
    };

    const isSmall = variant === 'small';

    return (
        <div className={twMerge(
            "w-full bg-white border-b border-gray-100 px-6 flex transition-all relative z-30",
            isSmall ? "items-center" : "flex-col justify-end pb-4",
            variantStyles[variant],
            className
        )}>
            <div className={twMerge("flex w-full items-center")}>

                {/* Leading Section */}
                {(leading || onBack) && (
                    <div className="flex shrink-0 items-center mr-4">
                        {leading ? leading : (onBack ? (
                            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-[var(--color-nav-hover)] active:bg-[var(--color-nav-pressed)] transition-colors">
                                <ChevronLeft className="size-6 text-[var(--color-text-primary)]" />
                            </button>
                        ) : null)}
                    </div>
                )}

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-center overflow-hidden">
                    {children ? children : (
                        <>
                            <h1 className={twMerge(
                                "font-bold text-[var(--color-text-primary)] truncate transition-all tracking-tight",
                                isSmall ? "text-xl" : "text-3xl"
                            )}>
                                {title}
                            </h1>
                            {subtitle && (
                                <span className={twMerge(
                                    "text-sm text-[var(--color-text-secondary)] truncate font-medium",
                                    isSmall ? "mt-0.5" : "mt-1"
                                )}>
                                    {subtitle}
                                </span>
                            )}
                        </>
                    )}
                </div>

                {/* Trailing Section */}
                {trailing && (
                    <div className={twMerge(
                        "flex shrink-0 items-center gap-3 ml-4",
                        isSmall ? "" : "self-start -mt-2"
                    )}>
                        {trailing}
                    </div>
                )}
            </div>
        </div>
    );
}
