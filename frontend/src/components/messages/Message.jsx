const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avtar">
        <div className="w-10 rounded-full">
          <img src="https://avatar.iran.liara.run/public/29" />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500">
        {"Hi Janeman!! What's up"}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        12:12
      </div>
    </div>
  );
};

export default Message;
