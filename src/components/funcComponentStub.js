import React, { useState, useEffect, useRef }  from 'react';

const lowerCase = (props) => {
    const [someVar, setSomeVar] = useState('');
    const someRef = useRef(0);

    useEffect(() => {
        console.log('component mounted');
    }, []);

    return (
        <div>

        </div>
    );
};

export default lowerCase;
