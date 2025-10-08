'use client';

import { ProgressProvider } from '@bprogress/next/app';

const LoadingBar = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProgressProvider
            height="4px"
            color="#214E4E"
            options={{ showSpinner: false }}
            shallowRouting
        >
            {children}
        </ProgressProvider>
    );
};

export default LoadingBar;