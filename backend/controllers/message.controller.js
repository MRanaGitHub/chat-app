import {Conversation} from "../models/conversation.model.js";
import {Message} from "../models/message.model.js";
import {ApiResponse} from "../utils/apiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const getUserMessages = asyncHandler(async (req, res) => {
  const {id: userToChatId} = req.params;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: {$all: [senderId, userToChatId]},
  }).populate("messages");

  const messages = conversation ? conversation.messages : [];

  return res.json(new ApiResponse(200, messages, "Messages Get successfully"));
});

export const sendMessage = asyncHandler(async (req, res) => {
  const {id: recieverId} = req.params;
  const {message} = req.body;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: {$all: [senderId, recieverId]},
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, recieverId],
    });
  }

  const newMessage = await Message.create({
    senderId,
    recieverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  // SHOKET IO FUNCTIONALITY GO TO HERE

  await Promise.all([conversation.save(), newMessage.save()]);

  //   const createdConversation = await conversation.save();
  //   const createdMessage = await newMessage.save();

  return res.json(new ApiResponse(200, {message: newMessage}, "Send messages successfully"));
});
