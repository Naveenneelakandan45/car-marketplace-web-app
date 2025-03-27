import React, { useEffect, useState } from 'react';
import { SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useUser } from '@clerk/clerk-react';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';

function Inbox() {
    const { user } = useUser();
    const [userId, setUserId] = useState(null);
    const [channelUrl, setChannelUrl] = useState(null);

    useEffect(() => {
        if (user) {
            const id = user.primaryEmailAddress?.emailAddress?.split('@')[0]; // Extract username from email
            setUserId(id); // ✅ Correctly set userId
        }
    }, [user]); // ✅ Add user as a dependency

    return (
        <div>
            <div style={{ width: '100%', height: '500px' }}>
                {/* ✅ Ensure userId is available before rendering SendBirdProvider */}
                {userId ? (
                    <SendBirdProvider
                        appId={import.meta.env.VITE_SENDBIRD_APP_ID}
                        userId={userId}
                        nickname={user?.fullName}
                        profileUrl={user?.imageUrl}
                        allowProfileEdit={true}
                    >
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-3 h-full'>
                            {/* Channel list */}
                            <div className='p-5 border shadow-lg'>
                                <GroupChannelList
                                    onChannelSelect={(channel) => {
                                        setChannelUrl(channel?.url);
                                    }}
                                    channelListQueryParams={{
                                        includeEmpty: true,
                                    }}
                                />
                            </div>
                            {/* Channel message area */}
                            <div className='md:col-span-2'>
                                {channelUrl ? (
                                    <GroupChannel channelUrl={channelUrl} />
                                ) : (
                                    <p className="text-gray-500 text-center mt-5">Select a channel</p>
                                )}
                            </div>
                        </div>
                    </SendBirdProvider>
                ) : (
                    <p className="text-gray-500 text-center mt-5">Loading chat...</p>
                )}
            </div>
        </div>
    );
}

export default Inbox;
