import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { CreateSendBirdUser,CreateSendBirdChannel } from '@/components/Shared/Service';
import { useNavigate } from 'react-router-dom';

function OwnersDetail({ carDetail }) {
    const { user } = useUser();
    const navigation = useNavigate();

    const OnMessageOwnerButtonClick = async () => {
        if (!user) {
            console.error("User not found.");
            return;
        }

        const userId = user?.primaryEmailAddress?.emailAddress?.split('@')[0];
        const ownerUserId = carDetail?.createdBy?.split('@')[0];

        console.log("Creating SendBird user for:", userId);
        try {
            const response = await CreateSendBirdUser(userId, user?.fullName, user?.imageUrl);
            console.log("Response from SendBird (User):", response);
        } catch (error) {
            console.error("Error creating user in SendBird:", error);
        }

        console.log("Creating SendBird owner for:", ownerUserId);
        try {
            const response = await CreateSendBirdUser(ownerUserId, carDetail?.userName, carDetail?.userImageUrl);
            console.log("Response from SendBird (Owner):", response);
        } catch (error) {
            console.error("Error creating owner in SendBird:", error);
        }
        //create channel
        try {
            console.log("Creating SendBird user for:", userId);
            await CreateSendBirdUser(userId, user?.fullName, user?.imageUrl);
            
            console.log("Creating SendBird owner for:", ownerUserId);
            await CreateSendBirdUser(ownerUserId, carDetail?.userName, carDetail?.userImageUrl);
            
            console.log("Creating SendBird Channel...");
            const channelResponse = await CreateSendBirdChannel("Car Deal Chat", [userId, ownerUserId]);
            console.log("Channel Created Successfully:", channelResponse);

            // Navigate to chat screen (replace with actual route if needed)
            navigation('/profile/');

        } catch (error) {
            console.error("Error in SendBird operations:", error);
        }
    };

    return (
        <div className='p-10 border rounded-xl shadow-md mt-7'>
            <h2 className='font-medium text-2xl mb-3'>Owner/ Deals</h2>
            <img src={carDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full' alt="Owner" />
            <h2 className='mt2 font-bold text-xl'>{carDetail?.userName}</h2>
            <h2 className='mt2 font-bold text-gray-500'>{carDetail?.createdBy}</h2>
            <Button className='w-full mt-6' onClick={OnMessageOwnerButtonClick}>
                Message Owner
            </Button>
        </div>
    );
}

export default OwnersDetail;
