export default function HabitatLogo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <img
        src="/logo.png"
        alt="Habitat Logo"
        className={className}
        style={{ objectFit: 'contain' }}
        />
    )
}
