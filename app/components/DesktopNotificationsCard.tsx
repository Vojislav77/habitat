'use client'

import { useState, useEffect } from 'react'
import { toggleDesktopReminders } from '../actions'
import { useRouter } from 'next/navigation'

export default function DesktopNotificationsCard({ initialEnabled }: { initialEnabled: boolean }) {
    const router = useRouter()
    const [isEnabled, setIsEnabled] = useState(initialEnabled)
    const [permission, setPermission] = useState<NotificationPermission>('default')

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission)
        }
    }, [])

    const handleToggle = async () => {
        if (!isEnabled) {
            // User is turning it ON, ask for browser permission
            if ('Notification' in window) {
                const result = await Notification.requestPermission()
                setPermission(result)
                if (result === 'granted') {
                    setIsEnabled(true)
                    await toggleDesktopReminders(true)
                    router.refresh()
                }
            }
        } else {
            // User is turning it OFF
            setIsEnabled(false)
            await toggleDesktopReminders(false)
            router.refresh()
        }
    }

    const sendTestNotification = () => {
        if ('Notification' in window && permission === 'granted') {
            new Notification("Habitat Reminder", {
                body: "This is a test notification. Time to track your habits!",
                icon: "/favicon.ico"
            })
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-[#9BD7D5] shadow-sm overflow-hidden">
        <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
        <h3 className="font-bold text-[#505050]">Desktop Notifications</h3>
        <p className="text-sm text-slate-600">Get notified in your browser when it's time to track your habits.</p>
        {permission === 'denied' && (
            <p className="text-xs text-[#FF7260] mt-1">Notifications are blocked. Please enable them in your browser settings.</p>
        )}
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
        <input
        type="checkbox"
        className="sr-only peer"
        checked={isEnabled && permission === 'granted'}
        onChange={handleToggle}
        />
        <div className="w-11 h-6 bg-[#9BD7D5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#129793]"></div>
        </label>

        {/* Test Button */}
        {isEnabled && permission === 'granted' && (
            <button
            onClick={sendTestNotification}
            className="px-4 py-2 bg-[#129793] hover:bg-[#9BD7D5] text-white text-sm font-medium rounded-lg transition-colors"
            >
            Test
            </button>
        )}
        </div>
        </div>
        </div>
    )
}
