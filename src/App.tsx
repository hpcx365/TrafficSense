import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Box, Button, Card, TextField, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import './App.css'

interface Dialog {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function App() {
  const [dialogs, setDialogs] = useState<Dialog[]>([
    {id: 1, text: "您好！我是TrafficSense AI助手，请问有什么可以帮助您的？", isUser: false, timestamp: new Date()},
  ]);
  const [inputValue, setInputValue] = useState("请分析当前交通状况");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // 添加用户消息
    const newUserMessage: Dialog = {
      id: dialogs.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setDialogs(prev => [...prev, newUserMessage]);
    setInputValue("");

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Dialog = {
        id: dialogs.length + 2,
        text: `已收到您的消息: "${inputValue}"。正在分析中...`,
        isUser: false,
        timestamp: new Date()
      };
      setDialogs(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleTraceabilityPrediction = () => {
    const newMessage: Dialog = {
      id: dialogs.length + 1,
      text: "请求执行溯源预测分析",
      isUser: true,
      timestamp: new Date()
    };
    setDialogs(prev => [...prev, newMessage]);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Dialog = {
        id: dialogs.length + 2,
        text: "溯源预测分析完成：根据历史数据和当前交通状况，预计未来1小时内主要拥堵路段将出现在市中心区域，建议提前规划绕行路线。",
        isUser: false,
        timestamp: new Date()
      };
      setDialogs(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleDecisionSuggestion = () => {
    const newMessage: Dialog = {
      id: dialogs.length + 1,
      text: "请求决策建议",
      isUser: true,
      timestamp: new Date()
    };
    setDialogs(prev => [...prev, newMessage]);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Dialog = {
        id: dialogs.length + 2,
        text: "决策建议：建议立即调度附近3辆交警巡逻车前往主要拥堵点进行交通疏导，并通过交通广播提醒市民绕行。",
        isUser: false,
        timestamp: new Date()
      };
      setDialogs(prev => [...prev, aiResponse]);
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
  }, [dialogs]);

  return (
    <Box sx={{backgroundColor: 'white'}}>
      <Box sx={{height: '100vh', width: '100vw', m: 0, p: 0}}>
        <Box sx={{width: '32%', height: '100%', borderRight: '1px solid #ccc', backgroundColor: '#f6f7fb'}}>
          <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <ChatHeader/>
            <DialogHistory
              dialogs={dialogs}
              messagesEndRef={messagesEndRef}
            />
            <SuggestionBar
              handleTraceabilityPrediction={handleTraceabilityPrediction}
              handleDecisionSuggestion={handleDecisionSuggestion}
            />
            <InputBar
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSendMessage={handleSendMessage}
              handleKeyPress={handleKeyPress}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const ChatHeader = () => {
  return (
    <Box sx={{mx: 4, my: 2, borderRadius: 6, background: 'linear-gradient(to bottom right, #535bf2, #747bff)'}}>
      <Typography variant="h5" sx={{py: 2, color: 'white', textAlign: 'center', fontFamily: 'bold'}}>
        TrafficSense AI 助手
      </Typography>
    </Box>
  )
}

interface DialogHistoryProps {
  dialogs: Dialog[]
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

const DialogHistory: React.FC<DialogHistoryProps> = (
  {
    dialogs,
    messagesEndRef,
  }
) => {
  return (
    <Box sx={{flexGrow: 1, overflowY: 'auto', px: 4}}>
      {dialogs.map(dialog =>
        dialog.isUser ? (
          <Box key={dialog.id} sx={{display: 'flex', justifyContent: 'flex-end', mb: 3}}>
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
              <Typography>{dialog.text}</Typography>
            </Card>
            <Avatar sx={{bgcolor: '#d75353', ml: 2}}>您</Avatar>
          </Box>
        ) : (
          <Box key={dialog.id} sx={{display: 'flex', justifyContent: 'flex-start', mb: 3}}>
            <Avatar sx={{bgcolor: '#4a90e2', mr: 2}}>AI</Avatar>
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
              <Typography sx={{mb: 2}}>{dialog.text}</Typography>
              <Typography variant="caption"
                          sx={{display: 'block', position: 'absolute', bottom: 8, left: 16, opacity: 0.7}}>
                {dialog.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
              </Typography>
            </Card>
          </Box>
        )
      )}
      <div ref={messagesEndRef}/>
    </Box>
  )
}

interface SuggestionBarProps {
  handleTraceabilityPrediction: () => void
  handleDecisionSuggestion: () => void
}

const SuggestionBar: React.FC<SuggestionBarProps> = (
  {
    handleTraceabilityPrediction,
    handleDecisionSuggestion,
  }
) => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: 2, px: 4, pb: 1, pt: 2}}>
      <Button
        variant="outlined"
        onClick={handleTraceabilityPrediction}
        startIcon={<TrendingUpIcon/>}
        sx={{borderRadius: 2, boxShadow: '#535bf233 0 4px 8px 0', "&:focus": {outline: 'none'}}}
      >
        溯源预测
      </Button>
      <Button
        variant="outlined"
        onClick={handleDecisionSuggestion}
        startIcon={<LightbulbIcon/>}
        sx={{borderRadius: 2, boxShadow: '#535bf233 0 4px 8px 0', "&:focus": {outline: 'none'}}}
      >
        决策建议
      </Button>
    </Box>
  )
}

interface InputBarProps {
  inputValue: string
  setInputValue: (inputValue: string) => void
  handleSendMessage: () => void
  handleKeyPress: (e: React.KeyboardEvent) => void
}

const InputBar: React.FC<InputBarProps> = (
  {
    inputValue,
    setInputValue,
    handleKeyPress,
    handleSendMessage,
  }
) => {
  return (
    <Box sx={{display: 'flex', px: 4, pt: 1, pb: 3, gap: 2}}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="输入您的问题..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            backgroundColor: 'white',
            boxShadow: '#535bf233 0 7px 12px 0',
          }
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon/>}
        onClick={handleSendMessage}
        sx={{
          width: '20%',
          borderRadius: 4,
          boxShadow: '#535bf233 0 7px 12px 0',
          "&:focus": {
            outline: 'none',
          }
        }}
      >
        发送
      </Button>
    </Box>
  )
}
