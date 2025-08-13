import {type Ref, useRef, useState} from 'react';
import {Box, Button, Card, CardContent, Divider, FormControl, InputLabel, MenuItem, Select, Slider, Typography} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import simVideo from './assets/sim_.mp4';
import simImage from './assets/map_.png'

const SimulationArea = () => {
  // 状态管理
  const [roadNetworkFile, setRoadNetworkFile] = useState('');
  const [trafficFlowFile, setTrafficFlowFile] = useState('');
  const [latitude, setLatitude] = useState('22.668');
  const [longitude, setLongitude] = useState('114.045');
  const [vehicleCount, setVehicleCount] = useState(2978);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  // 视频引用
  const videoRef: Ref<HTMLVideoElement> = useRef(null);

  // 路网数据文件选择处理
  const handleRoadNetworkFileChange = (event) => {
    setRoadNetworkFile(event.target.value);
  };

  // 车流数据文件选择处理
  const handleTrafficFlowFileChange = (event) => {
    setTrafficFlowFile(event.target.value);
  };

  // 开始仿真按钮处理
  const handleStartSimulation = () => {
    console.log('开始仿真', {
      roadNetworkFile,
      trafficFlowFile,
      latitude,
      longitude,
      vehicleCount,
      simulationSpeed
    });

    if (videoRef.current) {
      videoRef.current.play()
    }
    // 这里可以添加实际的仿真启动逻辑
  };

  const handleCloseSimulation = () => {
    setRoadNetworkFile('')
    setTrafficFlowFile('')
  }

  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden'}}>
      <Card sx={{minWidth: 300, maxWidth: 400, flex: 1, overflowY: 'auto'}}>
        <CardContent>
          {/* 路网数据文件选择器 */}
          <Box sx={{mb: 3}}>
            <Typography variant="subtitle1" gutterBottom sx={{mb: 1}}>
              路网数据文件
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="road-network-file-label">选择文件</InputLabel>
              <Select
                labelId="road-network-file-label"
                value={roadNetworkFile}
                label="选择文件"
                onChange={handleRoadNetworkFileChange}
              >
                <MenuItem value="">
                  <em>请选择</em>
                </MenuItem>
                <MenuItem value="深圳市龙华区">深圳市龙华区</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{my: 2}}/>

          {/* 车流数据文件选择器 */}
          <Box sx={{mb: 3}}>
            <Typography variant="subtitle1" gutterBottom sx={{mb: 1}}>
              车流数据文件
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="traffic-flow-file-label">选择文件</InputLabel>
              <Select
                labelId="traffic-flow-file-label"
                value={trafficFlowFile}
                label="选择文件"
                onChange={handleTrafficFlowFileChange}
              >
                <MenuItem value="">
                  <em>请选择</em>
                </MenuItem>
                <MenuItem value="深圳市龙华区 [预测] 6:00-9:00">深圳市龙华区 [预测] 6:00-9:00</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{my: 2}}/>

          {/* 经纬度标签 - 仅在选择路网文件后显示 */}
          {roadNetworkFile && (
            <Box sx={{mb: 3}}>
              <Typography variant="subtitle1" gutterBottom sx={{mb: 1}}>
                仿真参数
              </Typography>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    纬度
                  </Typography>
                  <Typography variant="h5">
                    {latitude}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    经度
                  </Typography>
                  <Typography variant="h5">
                    {longitude}
                  </Typography>
                </Box>
                {trafficFlowFile && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      车辆数量
                    </Typography>
                    <Typography variant="h5" color="primary">
                      {vehicleCount}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {roadNetworkFile && <Divider sx={{my: 2}}/>}

          {/* 仿真速度滑动条 */}
          <Box sx={{mb: 3}}>
            <Typography variant="subtitle1" gutterBottom sx={{mb: 1}}>
              仿真速度: {simulationSpeed}x
            </Typography>
            <Slider
              value={simulationSpeed}
              onChange={(event, newValue) => setSimulationSpeed(newValue)}
              aria-labelledby="simulation-speed-slider"
              valueLabelDisplay="auto"
              step={0.5}
              marks={[
                {value: 0.5, label: '0.5x'},
                {value: 1, label: '1x'},
                {value: 2, label: '2x'},
                {value: 5, label: '5x'},
              ]}
              min={0.5}
              max={5}
            />
          </Box>

          <Divider sx={{my: 2}}/>

          {/* 开始仿真按钮 */}
          <Box sx={{textAlign: 'center', mb: 3}}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<CloudUploadIcon/>}
              onClick={handleStartSimulation}
              fullWidth
            >
              开始仿真
            </Button>
          </Box>

          {/* 开始仿真按钮 */}
          <Box sx={{textAlign: 'center'}}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<SaveIcon/>}
              onClick={handleCloseSimulation}
              fullWidth
            >
              结束仿真
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{flex: 1, display: 'flex', overflow: 'hidden'}}>
        {trafficFlowFile ? (
          <video
            ref={videoRef}
            src={simVideo}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
            // autoPlay={true}
            // controls
          />
        ) : roadNetworkFile ? (
          <img
            src={simImage}
            alt={''}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        ) : (
          <Box sx={{flex: 1, alignItems: 'center'}}>
            <Typography variant="h4" sx={{height: '100%', color: '#666', textAlign: 'center', fontFamily: 'bold', pt: 40}}>
              请选择路网文件
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SimulationArea;
