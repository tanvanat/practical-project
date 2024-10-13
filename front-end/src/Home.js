import { Link } from 'react-router-dom';


const Home = () => {
    const title = 'Chat With Doctor';
    const link = "/Firstpage";
    return (
        <div className="home">
            <header class="bg-slate-200">
                <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div class="flex lg:flex-1">
                        <a href="#" class="-m-1.5 p-1.5">
                            <span class="sr-only">Your Company</span>
                            <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt=""></img>
                        </a>
                    </div>
                    <div class="hidden lg:flex lg:gap-x-12">
                        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Home</a>
                        <div class="relative">
                            <button
                                type="button"
                                class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                            >
                                Features
                                <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            
                            <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
                                    <form method="POST" action="#" role="none">
                                        <button type="submit" class="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Our Doctors</a>
                        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">FAQs</a>
                        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Our Company</a>
                        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Resources</a>
                    </div>
                    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Talk to a doctor <span aria-hidden="true">&rarr;</span></a>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Home;