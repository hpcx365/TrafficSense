import React, {useEffect, useRef, useState} from 'react'
import {Box} from '@mui/material'
import {ChatArea, type Dialog} from "./ChatArea.tsx"
import PrimarySearchAppBar from "./AppBar.tsx"

export default function App() {
  const dialogId = useRef(0)

  function allocateDialogId() {
    return dialogId.current++
  }

  const [dialogs, setDialogs] = useState<Dialog[]>([
    {
      id: allocateDialogId(),
      text: "您好！我是TrafficSense AI助手，请问有什么可以帮助您的？",
      isUser: false,
      timestamp: new Date()
    },
  ])
  const [inputValue, setInputValue] = useState("请分析当前交通状况")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // 添加用户消息
    const newUserMessage: Dialog = {
      id: allocateDialogId(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setDialogs(prev => [...prev, newUserMessage])
    setInputValue("")

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Dialog = {
        id: allocateDialogId(),
        text: `已收到您的消息: "${inputValue}"。正在分析中...`,
        isUser: false,
        timestamp: new Date()
      }
      setDialogs(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleTraceabilityPrediction = () => {
    const newMessage: Dialog = {
      id: allocateDialogId(),
      text: "请求执行溯源预测分析",
      isUser: true,
      timestamp: new Date()
    }
    setDialogs(prev => [...prev, newMessage])

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Dialog = {
        id: allocateDialogId(),
        text: "溯源预测分析完成：根据历史数据和当前交通状况，预计未来1小时内主要拥堵路段将出现在市中心区域，建议提前规划绕行路线。",
        isUser: false,
        timestamp: new Date()
      }
      setDialogs(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleDecisionSuggestion = () => {
    const newMessage: Dialog = {
      id: allocateDialogId(),
      text: "请求决策建议",
      isUser: true,
      timestamp: new Date()
    }
    setDialogs(prev => [...prev, newMessage])

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Dialog = {
        id: allocateDialogId(),
        text: "决策建议：建议立即调度附近3辆交警巡逻车前往主要拥堵点进行交通疏导，并通过交通广播提醒市民绕行。",
        isUser: false,
        timestamp: new Date()
      }
      setDialogs(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [dialogs])

  return (
    <Box sx={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      m: 0,
      p: 0,
      backgroundColor: 'white'
    }}>
      <Box sx={{width: '100%'}}>
        <PrimarySearchAppBar/>
      </Box>
      <Box sx={{width: '32%', height: '100%', flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden'}}>
        <ChatArea
          dialogs={dialogs}
          messagesEndRef={messagesEndRef}
          handleTraceabilityPrediction={handleTraceabilityPrediction}
          handleDecisionSuggestion={handleDecisionSuggestion}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />
      </Box>
    </Box>
  )
}
