import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Item from './Item'
import {Row, Spin, List, Avatar, Space, Col, Divider} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

function Dashboard(props) {
    const history = useHistory();

    const [language, setLanguage] = useState('en');
    const [pageNumber, setPageNumber] = useState(1);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchAdv()
    });

    const fetchAdv = async () => {

        const searchUrl = new URL("https://suchen.mobile.de/fahrzeuge/search.html");
        const params = {isSearchRequest: true, lang: language, pageNumber: pageNumber};
        Object.keys(params).forEach(key => searchUrl.searchParams.append(key, params[key]));

        const response = await fetch('/api/vehicles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({url: searchUrl})
        });

        const body = await response.json();

        await setItems(body.list);
    };


    return (
            <Row>
                {items.length ?
                    <List
                        itemLayout="vertical"
                        size="large"
                        // pagination={{
                        //     onChange: page => {console.log(page);},
                        //     pageSize: 3,
                        // }}
                        dataSource={items}
                        footer={
                            <div>
                                <b>ant design</b> footer part
                            </div>
                        }
                        renderItem={item => <Col span={16} offset={4} onHoverChange={<style></style>}><a
                            href={item.url}><Item{...item}/></a>
                            <Divider/></Col>}
                    />
                    : <Spin size='large' tip="Loading..." style={{position: 'absolute', top: '40%', left: '48%'}}/>
                }
            </Row>
    )

}

export default Dashboard
