export default function ProfileAvatar({ image, name, size = 'w-10 h-10' }: { image: string | null | undefined, name: string | null | undefined, size?: string }) {
    // 1. If it's an uploaded photo (Base64)
    if (image && image.startsWith('data:')) {
        return <img src={image} alt="Profile" className={`${size} rounded-full object-cover`} />
    }

    // 2. If it's a generic gradient avatar
    if (image && image.startsWith('avatar:')) {
        const gradId = image.split(':')[1]
        const grads: Record<string, string> = {
            grad1: 'bg-gradient-to-tr from-pink-500 to-rose-500',
            grad2: 'bg-gradient-to-tr from-cyan-500 to-blue-500',
            grad3: 'bg-gradient-to-tr from-amber-500 to-orange-500',
            grad4: 'bg-gradient-to-tr from-emerald-500 to-teal-500',
        }
        return (
            <div className={`${size} rounded-full ${grads[gradId] || 'bg-slate-500'} flex items-center justify-center text-white font-bold`}>
            {name?.[0] || 'U'}
            </div>
        )
    }

    // 3. Default fallback
    return (
        <div className={`${size} rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold`}>
        {name?.[0] || 'U'}
        </div>
    )
}
