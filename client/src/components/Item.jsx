import { Col, Card, Avatar, Form, Input, Button, Divider } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Meta } = Card;



function Item(props) {
    console.log(props);
    return (
        <Col className="gutter-row" span={6}>
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src={props.imageUrl}
                />
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                avatar={<Avatar src={props.imageUrl} />}
                title="Card title"
                description="This is the description"
            />
        </Card>
        </Col>
    )
}


export default Item

