import { useCallback, useEffect } from 'react';

function isClickedOutside(clickedElement, targetElement) {
    let clickedEl = clickedElement;

    while (clickedEl) {
        if (clickedEl === targetElement) {
            return false;
        }

        clickedEl = clickedEl.parentNode;
    }

    return document.contains(clickedElement);
}

export const ClickOutside = ({ children, reference, onClickOutside }) => {
    const handleOutsideClick = useCallback(
        (event) => {
            if (!reference || !onClickOutside) {
                return;
            }

            if (isClickedOutside(reference, event.target)) {
                onClickOutside();
            }
        },
        [onClickOutside, reference]
    );

    // handle clicks outside the popup
    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);

        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, [handleOutsideClick]);

    return children;
};
