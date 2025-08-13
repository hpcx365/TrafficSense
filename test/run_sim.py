import os
import subprocess
import xml.etree.ElementTree as ET

import bs4
import pandas as pd
from pyproj import Proj, Transformer
from tqdm import tqdm


def fcd_to_dataframe(file_xml):
    """
    将XML格式的浮动车数据转换为pandas DataFrame格式
    """
    with open(file_xml, 'r', encoding='UTF-8') as f_xml:
        doc = bs4.BeautifulSoup(f_xml, 'xml')

        data = []
        for t in tqdm(doc.select('timestep')):
            for v in t.select('vehicle'):
                data.append({
                    'time': t.attrs['time'],
                    'id': v.attrs['id'],
                    'x': float(v.attrs['x']),
                    'y': float(v.attrs['y']),
                    'angle': float(v.attrs['angle']),
                    'speed': float(v.attrs['speed']),
                    # 'lane': v.attrs['lane'],
                    'pos': float(v.attrs['pos'])
                })

        return pd.DataFrame(data)


def convert_coordinates(df, net_offset_x, net_offset_y, proj_parameter):
    """
    将DataFrame中的XY坐标转换为经纬度坐标
    """
    # 根据projParameter创建投影对象
    utm_proj = Proj(proj_parameter)
    wgs84_proj = Proj(init='epsg:4326')

    df['x_adj'] = df['x'] + net_offset_x
    df['y_adj'] = df['y'] + net_offset_y

    transformer = Transformer.from_crs(utm_proj.crs, wgs84_proj.crs)
    df['lon'], df['lat'] = zip(*df.apply(lambda row: transformer.transform(row['x_adj'], row['y_adj']), axis=1))
    df.drop(columns=['x_adj', 'y_adj'], inplace=True)

    return df


def extract_projection_info(net_file):
    """
    从net.xml文件中提取投影参数和netOffset值
    """
    tree = ET.parse(net_file)
    root = tree.getroot()

    # 查找location元素
    location_elem = root.find('location')
    if location_elem is not None:
        # 提取netOffset
        net_offset = location_elem.get('netOffset')
        if net_offset:
            # 解析netOffset字符串，格式为 "x,y"
            x, y = map(float, net_offset.split(','))

        # 提取projParameter
        proj_parameter = location_elem.get('projParameter')
        if proj_parameter:
            return -x, -y, proj_parameter

    raise ValueError("无法从 net.xml 文件中找到投影参数或 netOffset 信息")


def get_net_file_from_config(config_file):
    """
    从sumocfg配置文件中提取net-file路径
    """
    tree = ET.parse(config_file)
    root = tree.getroot()

    # 查找net-file元素
    net_file_elem = root.find('.//net-file')
    if net_file_elem is not None:
        net_file_value = net_file_elem.get('value')
        if net_file_value:
            # 如果是相对路径，需要基于配置文件路径进行解析
            if not os.path.isabs(net_file_value):
                config_dir = os.path.dirname(config_file)
                net_file_value = os.path.join(config_dir, net_file_value)
            return net_file_value

    raise ValueError("无法从配置文件中找到 net-file 信息")


def run_sumo(config_file, fcd_file):
    try:
        subprocess.run(['sumo', '-c', config_file, '--fcd-output', fcd_file], check=True)
    except subprocess.CalledProcessError as e:
        print(f"SUMO 命令执行失败: {e}")
        exit(1)
    except FileNotFoundError:
        print("未找到 SUMO 命令，请确认已安装 SUMO 并添加到系统路径")
        exit(1)


if __name__ == '__main__':
    config_file = input('sim.sumocfg: ')

    # 从配置文件中提取 net 文件路径
    net_file = get_net_file_from_config(config_file)

    # 生成 fcd.xml 文件路径（在同一目录下）
    config_dir = os.path.dirname(config_file)
    fcd_file = os.path.join(config_dir, 'fcd.xml')
    trans_fcd_csv = os.path.join(config_dir, 'fcd.csv')

    print("正在执行 SUMO 命令生成 fcd.xml...")
    run_sumo(config_file, fcd_file)

    print("正在解析 net.xml...")
    net_offset_x, net_offset_y, proj_parameter = extract_projection_info(net_file)

    print("正在读取 fcd.xml...")
    df = fcd_to_dataframe(fcd_file)

    print("正在转换坐标为经纬度...")
    df = convert_coordinates(df, net_offset_x, net_offset_y, proj_parameter)

    print("正在保存为 CSV...")
    df.to_csv(trans_fcd_csv, index=False)

    print("转换完成！")
