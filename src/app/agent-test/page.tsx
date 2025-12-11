'use client';

import Script from 'next/script';
import { JSX } from 'react';

// Declare the custom element so TypeScript doesn't complain
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                'agent-id': string;
            };
        }
    }
}

export default function AgentTestPage() {
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;

    if (!agentId) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="text-red-500">
                    Error: NEXT_PUBLIC_ELEVENLABS_AGENT_ID is not defined in environment variables.
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-gray-900">
            <div className="max-w-2xl w-full text-center space-y-8">
                <h1 className="text-4xl font-bold tracking-tight">Agent Test Page</h1>
                <p className="text-lg text-gray-600">
                    Interact with the Eleven Labs Conversational AI Agent below.
                </p>

                <div className="mt-8 flex justify-center">
                    {/* The widget will be injected here or as an overlay depending on its configuration */}
                    <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
                </div>
            </div>

            <Script
                src="https://unpkg.com/@elevenlabs/convai-widget-embed"
                strategy="afterInteractive"
                async
                type="text/javascript"
            />
        </div>
    );
}
