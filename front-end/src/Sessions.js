const people = [
    {
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Michael Foster',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Dries Vincent',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
]

export default function Sessions() {
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sessions</h1>
                </div>
            </header>
            <main>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
                    {people.map((person) => (
                        <li className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <img alt="" src={person.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                {person.lastSeen ? (
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                    </p>
                                ) : (
                                    <div className="mt-1 flex items-center gap-x-1.5">
                                        <p className="mt-1 text-xs leading-5 text-gray-500">now</p>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </div>
            </main>

        </>
    )
}

