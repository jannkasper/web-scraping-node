import React, {useState} from 'react'
import { Col, Row, List, Avatar, Space, Descriptions } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


function Item(props) {
    const [boxShadow, setBoxShadow] = useState({});

    return (
        <List.Item
            onMouseEnter={() => setBoxShadow({boxShadow: "0 0 20px #bebebe", })}
            onMouseLeave={() => setBoxShadow({})}
            style={boxShadow}
            key={props.title}
            extra={<img style={{borderRadius: '10px' }} width={272} alt="logo" src={props.imageUrl}/>}
        >
            <Descriptions title={props.title}>
                <Descriptions.Item label="Seller">{props.seller}</Descriptions.Item>
                <Descriptions.Item label="Address">{props.address}</Descriptions.Item>
                <Descriptions.Item label="First registration">{props.firstRegistration}</Descriptions.Item>
                <Descriptions.Item label="Kilometer">{props.kilometer}</Descriptions.Item>
                <Descriptions.Item label="Power">{props.power}</Descriptions.Item>
                <Descriptions.Item label="Price">{props.price}</Descriptions.Item>
            </Descriptions>
        </List.Item>
    )
}


export default Item

