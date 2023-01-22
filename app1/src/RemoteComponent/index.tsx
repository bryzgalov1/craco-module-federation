import React, { useState } from 'react';
import styles from './style.module.css';

const RemoteComponent = () => {
    const [count, setCount] = useState(0);

    return (
        <div className={styles.root}>
            <div>RemoteComponent app1</div>
            <div>
                <button
                    onClick={() => {
                        setCount((oldCount) => {
                            return oldCount + 1;
                        });
                    }}
                >
                    count click {count}
                </button>
            </div>
        </div>
    );
};

export default RemoteComponent;
