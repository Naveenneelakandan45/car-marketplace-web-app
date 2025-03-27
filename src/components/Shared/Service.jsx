import axios from "axios";

const FormatResult = (resp) => {
    console.log("Raw response before formatting:", resp); // ✅ Log input data

    let result = {};
    let finalResult = [];

    resp.forEach((item) => {
        const listingId = item.carListing?.id;  // ✅ Corrected key name
        
        if (!listingId) {
            console.warn("Skipping item with undefined listing ID:", item);
            return; // Skip invalid entries
        }

        if (!result[listingId]) {
            result[listingId] = {
                car: item.carListing,  // ✅ Corrected key name
                images: []
            };
        }

        if (item.carImages) {
            result[listingId].images.push(item.carImages);
        }
    });

    console.log("Grouped result before converting to array:", result); // ✅ Log grouped object

    Object.values(result).forEach((item) => {
        finalResult.push({
            ...item.car,
            images: item.images
        });
    });

    console.log("Final formatted response:", finalResult); // ✅ Log final formatted output

    return finalResult;
};
const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;
const BASE_URL = `https://api-${SendBirdApplicationId}.sendbird.com/v3/users`;
const CHANNEL_URL = `https://api-${SendBirdApplicationId}.sendbird.com/v3/group_channels`;

const CreateSendBirdUser = async (userId, nickName, profileUrl) => {
    if (!SendBirdApplicationId || !SendBirdApiToken) {
        console.error("Missing SendBird API credentials");
        return;
    }

    console.log("Checking if user exists in SendBird:", userId);

    try {
        // Check if the user already exists
        const existingUser = await axios.get(`${BASE_URL}/${userId}`, {
            headers: { "Api-Token": SendBirdApiToken }
        });

        console.log("User already exists. Updating user profile...");
        
        // If user exists, update nickname and profile
        return await axios.put(`${BASE_URL}/${userId}`, {
            nickname: nickName || existingUser.data.nickname || "Anonymous",
            profile_url: profileUrl || existingUser.data.profile_url || ""
        }, {
            headers: {
                "Content-Type": "application/json",
                "Api-Token": SendBirdApiToken
            }
        });

    } catch (error) {
        if (error.response?.status === 400 || error.response?.status === 404) {
            console.log("User does not exist. Creating a new user...");

            // If user does not exist, create them
            return await axios.post(BASE_URL, {
                user_id: userId,
                nickname: nickName || "Anonymous",
                profile_url: profileUrl || ""
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Api-Token": SendBirdApiToken
                }
            });
        } else {
            console.error("SendBird API Error:", error.response?.data || error.message);
            throw error;
        }
    }
 } 
 const CreateSendBirdChannel = async (channelName, userIds, coverUrl = "") => {
    if (!SendBirdApplicationId || !SendBirdApiToken) {
        console.error("Missing SendBird API credentials");
        return;
    }

    console.log("Creating SendBird Group Channel:", channelName, userIds);

    try {
        const response = await axios.post(CHANNEL_URL, {
            name: channelName,
            user_ids: userIds,  // List of users in the channel
            is_distinct: true,  // Ensures users always reuse the same channel if they already have one
            cover_url: coverUrl
        }, {
            headers: {
                "Content-Type": "application/json",
                "Api-Token": SendBirdApiToken
            }
        });

        console.log("Channel created successfully:", response.data);
        return response.data;

    } catch (error) {
        console.error("SendBird Channel Creation Error:", error.response?.data || error.message);
        throw error;
    }
};


export {
    FormatResult,
    CreateSendBirdUser,
    CreateSendBirdChannel,
};

