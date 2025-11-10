import studentsImage from "@/assets/students.jpg"
import { useState, useEffect } from "react"

export default function Hero() {
    const [currentIcon, setCurrentIcon] = useState(0)
    const [fade, setFade] = useState(true)
    
    const icons = [
        // Laptop SVG
        <svg key="laptop" className="w-64 h-64 md:w-80 md:h-80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <g transform="translate(120,120)">
                <g transform="translate(-70,-40)">
                    <rect x="0" y="0" width="140" height="85" rx="8" fill="var(--neutral-50)" stroke="var(--neutral-300)" strokeWidth="2" className="dark:fill-neutral-200 dark:stroke-neutral-500" />
                    <rect x="10" y="8" width="120" height="70" rx="6" fill="var(--neutral-400)" fillOpacity="0.25" className="dark:fill-neutral-400 dark:fill-opacity-40" />
                    <path d="M -10 95 L 150 95 L 145 105 L -5 105 Z" fill="var(--neutral-100)" stroke="var(--neutral-300)" strokeWidth="1.5" className="dark:fill-neutral-300 dark:stroke-neutral-500" />
                </g>
            </g>
        </svg>,
        
        // Desktop PC SVG
        <svg key="desktop" className="w-64 h-64 md:w-80 md:h-80" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <g transform="translate(140,140)">
                <g transform="translate(-80,-50)">
                    <rect x="0" y="0" width="160" height="100" rx="10" fill="var(--neutral-50)" stroke="var(--neutral-300)" strokeWidth="2" className="dark:fill-neutral-200 dark:stroke-neutral-500" />
                    <rect x="14" y="12" width="132" height="76" rx="8" fill="var(--neutral-400)" fillOpacity="0.25" className="dark:fill-neutral-400 dark:fill-opacity-40" />
                    <rect x="62" y="118" width="36" height="12" rx="4" fill="var(--neutral-300)" className="dark:fill-neutral-500" />
                </g>
            </g>
        </svg>,
        
        // Tablet SVG
        <svg key="tablet" className="w-64 h-64 md:w-80 md:h-80" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <g transform="translate(100,120)">
                <g transform="translate(-45,-60)">
                    <rect x="0" y="0" width="90" height="120" rx="10" fill="var(--neutral-50)" stroke="var(--neutral-300)" strokeWidth="2" className="dark:fill-neutral-200 dark:stroke-neutral-500" />
                    <rect x="8" y="8" width="74" height="104" rx="8" fill="var(--neutral-400)" fillOpacity="0.25" className="dark:fill-neutral-400 dark:fill-opacity-40" />
                    <circle cx="45" cy="116" r="3" fill="var(--neutral-300)" className="dark:fill-neutral-500" />
                </g>
            </g>
        </svg>,
        
        // Mobile phone SVG
        <svg key="mobile" className="w-64 h-64 md:w-80 md:h-80" viewBox="0 0 160 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <g transform="translate(80,120)">
                <g transform="translate(-26,-62)">
                    <rect x="0" y="0" width="52" height="124" rx="14" fill="var(--neutral-50)" stroke="var(--neutral-300)" strokeWidth="1.5" className="dark:fill-neutral-200 dark:stroke-neutral-500" />
                    <rect x="6" y="10" width="40" height="104" rx="10" fill="var(--neutral-400)" fillOpacity="0.25" className="dark:fill-neutral-400 dark:fill-opacity-40" />
                    <circle cx="26" cy="120" r="3" fill="var(--neutral-300)" className="dark:fill-neutral-500" />
                </g>
            </g>
        </svg>
    ]
    
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false)
            setTimeout(() => {
                setCurrentIcon((prev) => (prev + 1) % icons.length)
                setFade(true)
            }, 300) // Fade out duration
        }, 3000) // Change every 3 seconds
        
        return () => clearInterval(interval)
    }, [icons.length])
    return (
        <section className="mb-6">
            {/* Breadcrumbs */}
            <nav className="mb-4" aria-label="Breadcrumb">
                <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                    <li>/</li>
                    <li className="text-foreground font-medium">Devices</li>
                </ol>
            </nav>

            {/* Illustration is the hero container: all content sits on top of this wrapper */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-card shadow-[0_2px_12px_rgba(0,0,0,0.08)] min-h-[240px] md:min-h-[300px] dark:brightness-75" style={{
                backgroundImage: `url(${studentsImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                {/* Dark overlay for text readability - much darker in dark mode */}
                <div className="absolute inset-0 rounded-2xl bg-foreground/40 dark:bg-foreground/80" />
                
                {/* Additional dark background overlay for dark mode */}
                <div className="absolute inset-0 rounded-2xl bg-background/30 dark:bg-background/50" />
                
                {/* Gradient overlay for depth - using primary color - reduced in dark mode */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/15 to-accent/20 dark:from-primary/15 dark:via-primary/10 dark:to-accent/15" />
                
                {/* Radial gradient overlay for depth - reduced in dark mode */}
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,var(--primary)/25%,transparent_90%)] dark:bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,var(--primary)/20%,transparent_90%)]" />

                {/* content overlay */}
                <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 max-w-2xl">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-lg">Device catalogue</h1>
                    <p className="mt-2 text-sm sm:text-base text-white/90 drop-shadow-md">Browse available devices from Campus IT — reserve laptops, tablets and cameras for study, projects and events. Fast pickup and easy returns.</p>
                </div>

                {/* Right side device illustration - rotates through icons */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 opacity-60 dark:opacity-70">
                        <div 
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                                fade ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {icons[currentIcon]}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
