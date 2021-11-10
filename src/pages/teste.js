import React, { useState, useEffect } from 'react';

export default function Test() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // alert('oi');
    }, []);

    useEffect(() => {
        alert('oi');
    }, [count]);

    const handleClick = () => {
        setCount((oldState) => oldState + 1);
    };

    return (
        <div>
            Hello
            <button type="button" onClick={handleClick}>
                Click
            </button>
            <div>Count: {count}</div>
        </div>
    );
}
