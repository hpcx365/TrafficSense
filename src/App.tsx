import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Box, Button, Card, CardContent, Grid, TextField, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import './App.css'

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "您好！我是TrafficSense AI助手，请问有什么可以帮助您的？", isUser: false, timestamp: new Date() },
  ]);
  const [inputValue, setInputValue] = useState("请分析当前交通状况");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // 添加用户消息
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: `已收到您的消息: "${inputValue}"。正在分析中...`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // 新增功能按钮处理函数
  const handleTraceabilityPrediction = () => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: "请求执行溯源预测分析",
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "溯源预测分析完成：根据历史数据和当前交通状况，预计未来1小时内主要拥堵路段将出现在市中心区域，建议提前规划绕行路线。",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleDecisionSuggestion = () => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: "请求决策建议",
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "决策建议：建议立即调度附近3辆交警巡逻车前往主要拥堵点进行交通疏导，并通过交通广播提醒市民绕行。",
        isUser: false,
        timestamp: new Date()
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ backgroundColor: 'white' }}>
      <Grid container sx={{ height: '100vh', width: '100vw', m: 0, p: 0 }}>
        <Grid item sx={{ width: '32%', height: '100%', borderRight: '1px solid #ccc', backgroundColor: '#f6f7fb' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ mx: 4, my: 2, borderRadius: 6, background: 'linear-gradient(to bottom right, #535bf2, #747bff)' }}>
              <Typography variant="h5" sx={{ py: 2, color: 'white', textAlign: 'center', fontFamily: 'bold' }}>
                TrafficSense AI 助手
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 4 }}>
              {messages.map(message =>
                message.isUser ? (
                  <Box key={message.id} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                    <Card
                      sx={{
                        p: 2,
                        backgroundColor: '#1890ff',
                        color: 'white',
                        borderRadius: 4,
                        boxShadow: '0 4px 12px 1px rgba(0, 83, 245, 0.2)',
                        maxWidth: '75%',
                        textAlign: 'left',
                        position: 'relative'
                      }}
                    >
                      <Typography>{message.text}</Typography>
                    </Card>
                    <Avatar sx={{ bgcolor: '#d75353', ml: 2 }}>您</Avatar>
                  </Box>
                ) : (
                  <Box key={message.id} sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
                    <Avatar sx={{ bgcolor: '#4a90e2', mr: 2 }}>AI</Avatar>
                    <Card
                      sx={{
                        p: 2,
                        backgroundColor: 'white',
                        color: '#333',
                        borderRadius: 4,
                        boxShadow: '0 4px 12px 1px rgba(68, 88, 199, 0.2)',
                        maxWidth: '75%',
                        textAlign: 'left',
                        position: 'relative'
                      }}
                    >
                      <Typography sx={{ mb: 2 }}>{message.text}</Typography>
                      <Typography variant="caption" sx={{ display: 'block', position: 'absolute', bottom: 8, left: 16, opacity: 0.7 }}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Card>
                  </Box>
                )
              )}
              <div ref={messagesEndRef} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, px: 4, pb: 1, pt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleTraceabilityPrediction}
                startIcon={<TrendingUpIcon />}
                sx={{
                  borderRadius: 2,
                  boxShadow: '#535bf233 0 4px 8px 0',
                  "&:focus": {
                    outline: 'none',
                  }
                }}
              >
                溯源预测
              </Button>
              <Button
                variant="outlined"
                onClick={handleDecisionSuggestion}
                startIcon={<LightbulbIcon />}
                sx={{
                  borderRadius: 2,
                  boxShadow: '#535bf233 0 4px 8px 0',
                  "&:focus": {
                    outline: 'none',
                  }
                }}
              >
                决策建议
              </Button>
            </Box>

            <Box sx={{ display: 'flex', px: 4, pt: 1, pb: 3, gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="输入您的问题..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'white',
                    boxShadow: '#535bf233 0 7px 12px 0',
                  }
                }}
              />
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                sx={{
                  width: '20%',
                  borderRadius: 2,
                  boxShadow: '#535bf233 0 7px 12px 0',
                  "&:focus": {
                    outline: 'none',
                  }
                }}
              >发送</Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ height: '60%', p: 3, borderBottom: '1px solid #eee' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>交通地图</Typography>
            <Card sx={{ height: 'calc(100% - 60px)', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, p: 0 }}>
                <Box sx={{ width: '100%', height: '100%', border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
                  <svg width="100%" height="100%" viewBox="0 0 800 300">
                    {/* 示例道路 */}
                    <rect x="50" y="100" width="700" height="20" fill="#444" />
                    <rect x="50" y="200" width="700" height="20" fill="#444" />
                    <rect x="300" y="50" width="20" height="200" fill="#444" />
                    <rect x="500" y="50" width="20" height="200" fill="#444" />

                    {/* 示例车辆 */}
                    <circle cx="150" cy="110" r="8" fill="#f00" />
                    <circle cx="400" cy="210" r="8" fill="#0f0" />
                    <circle cx="310" cy="150" r="8" fill="#00f" />

                    {/* 交通信号灯 */}
                    <rect x="295" y="90" width="30" height="40" fill="#333" />
                    <circle cx="310" cy="100" r="5" fill="#ff0" />
                    <circle cx="310" cy="115" r="5" fill="#000" />
                    <circle cx="310" cy="130" r="5" fill="#000" />
                  </svg>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ height: '40%', p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>交通数据图表</Typography>
            <Card sx={{ height: 'calc(100% - 60px)', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, p: 0 }}>
                <Box sx={{ width: '100%', height: '100%', border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
                  {/* 图表占位符 */}
                  <svg width="100%" height="100%" viewBox="0 0 600 200">
                    {/* 示例柱状图 */}
                    <rect x="50" y="100" width="30" height="80" fill="#4a90e2" />
                    <rect x="100" y="60" width="30" height="120" fill="#4a90e2" />
                    <rect x="150" y="80" width="30" height="100" fill="#4a90e2" />
                    <rect x="200" y="40" width="30" height="140" fill="#4a90e2" />
                    <rect x="250" y="90" width="30" height="90" fill="#4a90e2" />

                    {/* 坐标轴 */}
                    <line x1="30" y1="180" x2="580" y2="180" stroke="#000" strokeWidth="2" />
                    <line x1="30" y1="20" x2="30" y2="180" stroke="#000" strokeWidth="2" />
                  </svg>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
