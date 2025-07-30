import React, {useEffect, useRef, useState} from 'react'
import {Box, Divider, List, ListItem, Typography} from '@mui/material'
import {ChatArea, type Dialog} from "./ChatArea.tsx"
import PrimarySearchAppBar from "./AppBar.tsx"
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from '@mui/icons-material/Error';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import {LineChart} from '@mui/x-charts/LineChart';
import {BarChart, PieChart, RadarChart} from '@mui/x-charts';

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
    <Box sx={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', backgroundColor: 'white'}}>
      <Box sx={{width: '100%', boxShadow: boxShadow}}>
        <PrimarySearchAppBar/>
      </Box>
      <Box sx={{width: '100%', height: '100%', flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden'}}>
        <Box sx={{width: '30%', height: '100%', display: 'flex', flexDirection: 'row', overflow: 'hidden', backgroundColor: '#f6f7fb', boxShadow: boxShadow}}>
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

        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', overflowY: 'hidden', color: '#333', backgroundColor: '#f6f7fb', m: 2, mb: 1, boxShadow: boxShadow}}>
            <Box sx={{display: 'flex', alignItems: 'center', backgroundColor: '#1976d2', gap: 1, p: 1}}>
              <EditRoadIcon sx={{color: 'white'}}/>
              <Typography variant='h5' sx={{color: 'white'}}>决策仿真</Typography>
            </Box>
            <Box sx={{flex: 1, flexDirection: 'column', display: 'flex', overflowY: 'hidden'}}>
              <Box sx={{flex: 1, flexDirection: 'row', display: 'flex', overflowY: 'hidden', gap: 2, p: 2}}>
                <PieChart
                  series={[
                    {
                      paddingAngle: 5,
                      innerRadius: 60,
                      outerRadius: 80,
                      data: dataPie,
                    },
                  ]}
                  width={200}
                  height={200}
                  sx={{boxShadow: boxShadow}}
                />
                <RadarChart
                  height={300}
                  series={[{label: 'Lisa', data: [120, 98, 86, 99, 85, 65]}]}
                  radar={{
                    max: 120,
                    metrics: ['高峰承载能力', '事故处理能力', '流量运输能力', '拥堵处理能力', '行人舒适度', '噪音控制'],
                  }}
                  sx={{boxShadow: boxShadow}}
                />
              </Box>
              <Box sx={{flex: 1, flexDirection: 'row', display: 'flex', overflowY: 'hidden', gap: 2, p: 2}}>
                <LineChart
                  height={300}
                  series={[
                    {data: pDataLine, label: '机动车总流量'},
                    {data: uDataLine, label: '非机动车总流量'},
                  ]}
                  xAxis={[{scaleType: 'point', data: xLabels}]}
                  yAxis={[{width: 50}]}
                  margin={margin}
                  sx={{boxShadow: boxShadow}}
                />
                <BarChart
                  height={300}
                  series={[
                    {
                      data: pDataBar,
                      label: '信号灯平均等待时长',
                      id: 'pvId',

                      yAxisId: 'leftAxisId',
                    },
                    {
                      data: uDataBar,
                      label: '路口平均通行时长',
                      id: 'uvId',

                      yAxisId: 'rightAxisId',
                    },
                  ]}
                  xAxis={[{data: xLabels}]}
                  yAxis={[
                    {id: 'leftAxisId', width: 50},
                    {id: 'rightAxisId', position: 'right'},
                  ]}
                  sx={{boxShadow: boxShadow}}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{height: '24%', display: 'flex', flexShrink: 0, m: 2, gap: 2}}>
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', color: '#333', backgroundColor: '#f6f7fb', boxShadow: boxShadow}}>
              <Box sx={{display: 'flex', alignItems: 'center', backgroundColor: '#1976d2', gap: 1, p: 1}}>
                <LocalPoliceIcon sx={{color: 'white'}}/>
                <Typography variant='h5' sx={{color: 'white'}}>交警资源</Typography>
              </Box>
              <InfoList policeInfo={[
                {message: '交警A组 - 城区中心', secondary: '充足', ok: true},
                {message: '交警B组 - 工业区', secondary: '充足', ok: true},
                {message: '交警C组 - 居住区', secondary: '紧张', ok: false},
                {message: '交警D组 - 商业区', secondary: '充足', ok: true},
              ]}/>
            </Box>

            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', color: '#333', backgroundColor: '#f6f7fb', boxShadow: boxShadow}}>
              <Box sx={{display: 'flex', alignItems: 'center', backgroundColor: '#1976d2', gap: 1, p: 1}}>
                <CarCrashIcon sx={{color: 'white'}}/>
                <Typography variant='h5' sx={{color: 'white'}}>事故列表</Typography>
              </Box>
              <InfoList policeInfo={[
                {message: '中山路与人民路交叉口 - 轻微追尾', secondary: '处理中', ok: true},
                {message: '商业街路段 - 车辆抛锚', secondary: '已处理', ok: true},
                {message: '环城高速 - 多车连环相撞', secondary: '紧急处理', ok: false},
              ]}/>
            </Box>

            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', color: '#333', backgroundColor: '#f6f7fb', boxShadow: boxShadow}}>
              <Box sx={{display: 'flex', alignItems: 'center', backgroundColor: '#1976d2', gap: 1, p: 1}}>
                <NotificationImportantIcon sx={{color: 'white'}}/>
                <Typography variant='h5' sx={{color: 'white'}}>高峰预警</Typography>
              </Box>
              <Box sx={{flex: 1, overflow: 'auto'}}>
                <List sx={{p: 0}}>
                  <Divider/>
                  <ListItem>预计明天(8:00-9:30)城区主干道将出现严重拥堵，请提前安排交通疏导工作。</ListItem>
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const margin = {right: 24};
const uDataLine = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pDataLine = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  '00:00',
  '03:00',
  '06:00',
  '09:00',
  '12:00',
  '15:00',
  '18:00',
];

const uDataBar = [40, 30, 20, 27, 18, 23, 34];
const pDataBar = [24, 13, 98, 39, 48, 38, 43];

const dataPie = [
  {label: '人行道', value: 400},
  {label: '地铁口', value: 300},
  {label: '路口', value: 300},
  {label: '商业区', value: 200},
];

const boxShadow = '2px 6px 12px -2px rgba(53, 83, 245, 0.2)'

interface InfoItem {
  message: string
  secondary: string
  ok: boolean
}

interface InfoListProps {
  policeInfo: InfoItem[]
}

const InfoList: React.FC<InfoListProps> = (
  {
    policeInfo
  }
) => {
  return (
    <Box sx={{flexGrow: 1, overflow: 'auto'}}>
      <List sx={{p: 0}}>
        {policeInfo.map(infoItem => (
          <Box>
            <Divider/>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
              secondaryAction={
                infoItem.ok ?
                  <Box display='flex' flexDirection='row'>
                    <Typography sx={{pr: 1, color: '#188cffdd'}}>{infoItem.secondary}</Typography>
                    <CheckCircleIcon sx={{color: '#1874ffdd'}}/>
                  </Box> :
                  <Box display='flex' flexDirection='row'>
                    <Typography sx={{pr: 1, color: '#ff5638dd'}}>{infoItem.secondary}</Typography>
                    <ErrorIcon sx={{color: '#ff3838dd'}}/>
                  </Box>
              }>
              <Typography>{infoItem.message}</Typography>
            </ListItem>
          </Box>
        ))}
      </List>
    </Box>
  )
}
