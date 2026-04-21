import { useState, Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

export const NavDrawer = ({ 
    index = [{href:"#", label:"", level:1}]
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    const getLevelPadding = (level) => {
        switch(level) {
            case 4:
                return "pl-16 text-white";
            case 3:
                return "pl-12 text-sky";
            case 2:
                return "pl-8 text-inchworm";
            case 1:
                return "pl-4 text-strawberry";
            default:
                return "pl-0";
        }
    };

    return (
    <Fragment>
        {/* Drawer with button inside */}
        <div
            className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <nav className="bg-wetsoil/80 backdrop-blur-md p-6 shadow-xl border-4 border-l-0 border-white text-white rounded-r-lg max-h-[80vh] overflow-y-auto max-w-64">
                <ol className="flex flex-col gap-4 text-start">
                    {index.map(({ href, label, level }) => (
                        <li key={href}>
                            <a
                                href={href}
                                className={ getLevelPadding(level) + " hover:underline font-accent block text-sm" }
                                onClick={(e) => handleLinkClick(e)}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>

            {/* Toggle Button - positioned relative to drawer */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute left-full top-[50%] bg-wetsoil text-white p-3 rounded-r-lg shadow-xl border-4 border-l-0 border-white hover:bg-wetsoil/90 transition-all"
                aria-label="Toggle navigation"
            >
                <div className='flex items-center'>
                    TOC
                <ChevronRight 
                    className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
                </div>
            </button>
        </div>

        {/* Overlay for mobile */}
        {isOpen && (
            <div
                className="fixed inset-0 bg-black/20 z-10 md:hidden"
                onClick={() => setIsOpen(false)}
            />
        )}
    </Fragment>
    );
};

NavDrawer.propTypes = {
    index: PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired
    }))
};