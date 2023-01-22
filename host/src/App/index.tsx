import React, { Suspense, lazy } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import styles from './style.module.css';

const RemoteComponentApp1 = lazy(() => delayForDemo(1500, import('app1/RemoteComponent')));
const RemoteComponentApp2 = lazy(() => delayForDemo(1000, import('app2/RemoteComponent')));

function App() {
    return (
        <div className={styles.root}>
            <h1>Host</h1>

            <div className={styles.remoteComponent}>
                <ErrorBoundary
                    fallback={<div>Не удалось загрузить RemoteComponent app1</div>}
                >
                    <Suspense
                        fallback={<div>Загрузка RemoteComponent app1...</div>}
                    >
                        <RemoteComponentApp1 />
                    </Suspense>
                </ErrorBoundary>
            </div>

            <br />

            <div className={styles.remoteComponent}>
                <ErrorBoundary
                    fallback={<div>Не удалось загрузить RemoteComponent app2</div>}
                >
                    <Suspense
                        fallback={<div>Загрузка RemoteComponent app2...</div>}
                    >
                        <RemoteComponentApp2 />
                    </Suspense>
                </ErrorBoundary>
            </div>

        </div>
    );
}

async function delayForDemo(ms: number, promise: Promise<{ default: React.ComponentType<{}>; }>) {
    await new Promise(resolve => {
        setTimeout(resolve, ms);
    });
    return promise;
}

export default App;
