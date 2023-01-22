import React from 'react';

type TProps = {
    fallback: React.ReactElement;
    children: React.ReactElement;
};

class ErrorBoundary extends React.Component<TProps> {
    state = {
        hasError: false
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    // componentDidCatch(error, info) {
    //     logErrorToMyService(error, info.componentStack);
    // }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
