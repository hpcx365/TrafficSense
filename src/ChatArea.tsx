import React from "react"
import {Avatar, Box, Button, Card, createTheme, TextField, ThemeProvider, Typography} from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import SendIcon from "@mui/icons-material/Send"
import MuiMarkdown from 'mui-markdown'

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1rem',
    },
  },
});

export interface Dialog {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatAreaProps {
  dialogs: Dialog[]
  messagesEndRef: React.RefObject<HTMLDivElement | null>
  handleTraceabilityPrediction: () => void
  handleDecisionSuggestion: () => void
  inputValue: string
  setInputValue: (inputValue: string) => void
  handleSendMessage: () => void
  handleKeyPress: (e: React.KeyboardEvent) => void
}

export const ChatArea: React.FC<ChatAreaProps> = (
  {
    dialogs,
    messagesEndRef,
    handleTraceabilityPrediction,
    handleDecisionSuggestion,
    inputValue,
    setInputValue,
    handleSendMessage,
    handleKeyPress,
  }
) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
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
  )
}

export const ChatHeader = () => {
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

export const DialogHistory: React.FC<DialogHistoryProps> = (
  {
    dialogs,
    messagesEndRef,
  }
) => {
  return (
    <ThemeProvider theme={theme}>
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
                  position: 'relative',
                }}
              >
                <MuiMarkdown>{dialog.text}</MuiMarkdown>
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
                  position: 'relative',
                }}
              >
                <MuiMarkdown>{dialog.text}</MuiMarkdown>
                <Typography variant="caption"
                            sx={{display: 'block', bottom: 8, left: 16, opacity: 0.7, mt: 1}}>
                  {dialog.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </Typography>
              </Card>
            </Box>
          )
        )}
        <div ref={messagesEndRef}/>
      </Box>
    </ThemeProvider>
  )
}

interface SuggestionBarProps {
  handleTraceabilityPrediction: () => void
  handleDecisionSuggestion: () => void
}

export const SuggestionBar: React.FC<SuggestionBarProps> = (
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
        sx={{borderRadius: 2, boxShadow: '#535bf233 0 4px 8px 0'}}
      >
        溯源预测
      </Button>
      <Button
        variant="outlined"
        onClick={handleDecisionSuggestion}
        startIcon={<LightbulbIcon/>}
        sx={{borderRadius: 2, boxShadow: '#535bf233 0 4px 8px 0'}}
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

export const InputBar: React.FC<InputBarProps> = (
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
        }}
      >
        发送
      </Button>
    </Box>
  )
}
