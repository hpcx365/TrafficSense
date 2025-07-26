import React, {useEffect, useRef, useState} from 'react';
import './App.css'

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {id: 1, text: "您好！我是TrafficSense AI助手，请问有什么可以帮助您的？", isUser: false},
  ]);
  const [inputValue, setInputValue] = useState("请分析当前交通状况");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // 添加用户消息
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: `已收到您的消息: "${inputValue}"。正在分析中...`,
        isUser: false
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="chat-container">
          <div className="chat-header">
            <h2>TrafficSense AI助手</h2>
          </div>
          <div className="chat-messages">
            {messages.map(message =>
              message.isUser ?
                (
                  <div key={message.id} className="message-box user-message-box">
                    <div className="message user-message">
                      <p>{message.text}</p>
                    </div>
                    <div className="avatar user-avatar">您</div>
                  </div>
                ) : (
                  <div key={message.id} className="message-box ai-message-box">
                    <div className="avatar ai-avatar">AI</div>
                    <div className="message ai-message">
                      <p>{message.text}</p>
                    </div>
                  </div>
                )
            )}
            <div ref={messagesEndRef}/>
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="输入您的问题..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>发送</button>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="map-container">
          <h2>交通地图</h2>
          <div className="svg-map">
            <svg width="100%" height="300" viewBox="0 0 800 300">
              {/* 示例道路 */}
              <rect x="50" y="100" width="700" height="20" fill="#444"/>
              <rect x="50" y="200" width="700" height="20" fill="#444"/>
              <rect x="300" y="50" width="20" height="200" fill="#444"/>
              <rect x="500" y="50" width="20" height="200" fill="#444"/>

              {/* 示例车辆 */}
              <circle cx="150" cy="110" r="8" fill="#f00"/>
              <circle cx="400" cy="210" r="8" fill="#0f0"/>
              <circle cx="310" cy="150" r="8" fill="#00f"/>

              {/* 交通信号灯 */}
              <rect x="295" y="90" width="30" height="40" fill="#333"/>
              <circle cx="310" cy="100" r="5" fill="#ff0"/>
              <circle cx="310" cy="115" r="5" fill="#000"/>
              <circle cx="310" cy="130" r="5" fill="#000"/>
            </svg>
          </div>
        </div>

        <div className="chart-container">
          <h2>交通数据图表</h2>
          <div className="chart-placeholder">
            {/* 图表占位符 */}
            <svg width="100%" height="200" viewBox="0 0 600 200">
              {/* 示例柱状图 */}
              <rect x="50" y="100" width="30" height="80" fill="#4a90e2"/>
              <rect x="100" y="60" width="30" height="120" fill="#4a90e2"/>
              <rect x="150" y="80" width="30" height="100" fill="#4a90e2"/>
              <rect x="200" y="40" width="30" height="140" fill="#4a90e2"/>
              <rect x="250" y="90" width="30" height="90" fill="#4a90e2"/>

              {/* 坐标轴 */}
              <line x1="30" y1="180" x2="580" y2="180" stroke="#000" strokeWidth="2"/>
              <line x1="30" y1="20" x2="30" y2="180" stroke="#000" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
