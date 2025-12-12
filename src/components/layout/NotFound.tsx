import React from 'react';
import { Search, ArrowLeft, ShieldQuestionMark } from 'lucide-react';
import { Button } from '../ui/button';

const NotFoundView: React.FC = () => {
    return (
        <div className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden">
            <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center px-6 py-12 gap-6">

                {/* Icon */}
                <div className="relative mb-2">
                    <ShieldQuestionMark
                        size={80}
                        className="text-muted-foreground"
                        strokeWidth={1.5}
                    />
                </div>

                {/* Error code */}
                <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-semibold text-foreground/80">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-muted-foreground max-w-md leading-relaxed">
                    The page you're looking for doesn't exist or has been moved. Check the URL or head back to safety.
                </p>

                {/* Info box */}
                <div className="bg-muted/50 backdrop-blur-sm p-4 rounded-lg border-l-4 border-l-primary flex items-start gap-3 text-left max-w-md border border-border">
                    <Search className="text-primary mt-0.5 shrink-0" size={20} />
                    <div>
                        <h4 className="text-primary font-medium text-sm mb-0.5">Lost Your Way?</h4>
                        <p className="text-muted-foreground text-sm">Double-check the URL or use the button below to return home.</p>
                    </div>
                </div>

                {/* Button */}
                <Button
                    variant="default"
                    size="lg"
                    onClick={() => window.location.href = '/'}
                    className="mt-2"
                >
                    <ArrowLeft size={18} />
                    Go Home
                </Button>

                <div className="text-xs text-muted-foreground/60 font-mono mt-4">
                    Error 404 • {new Date().toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
};

export default NotFoundView;
