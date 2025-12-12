import React from 'react';
import { Shield, Lock, ArrowLeft, Fingerprint } from 'lucide-react';
import { Button } from '../ui/button';

const UnauthorizedView: React.FC = () => {
  return (
    <div className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden">

      {/* Muted police lights background effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[60vw] h-[60vh] bg-blue-500/20 rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4"
          style={{ animation: 'pulse-blue 2s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[60vw] h-[60vh] bg-red-500/20 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4"
          style={{ animation: 'pulse-red 2s ease-in-out infinite 1s' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center px-6 py-12 gap-6">

        {/* Icon */}
        <div className="relative mb-2">
          <Shield
            size={80}
            className="text-muted-foreground"
            strokeWidth={1.5}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock size={28} className="text-muted-foreground" strokeWidth={2} />
          </div>
        </div>

        {/* Error code */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
          401
        </h1>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-foreground/80">
          Unauthorized Access
        </h2>

        {/* Description */}
        <p className="text-muted-foreground max-w-md leading-relaxed">
          You don't have permission to view this page. Please log in with valid credentials to continue.
        </p>

        {/* Info box */}
        <div className="bg-muted/50 backdrop-blur-sm p-4 rounded-lg border-l-4 border-l-primary flex items-start gap-3 text-left max-w-md border border-border">
          <Fingerprint className="text-primary mt-0.5 shrink-0" size={20} />
          <div>
            <h4 className="text-primary font-medium text-sm mb-0.5">Authentication Required</h4>
            <p className="text-muted-foreground text-sm">Your credentials were not provided or are invalid.</p>
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
          Go Back
        </Button>

        <div className="text-xs text-muted-foreground/60 font-mono mt-4">
          Error 401 • {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* CSS for background animations */}
      <style>{`
        @keyframes pulse-blue {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes pulse-red {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default UnauthorizedView;

