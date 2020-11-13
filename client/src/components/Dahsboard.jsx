import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import Item from './Item'
import {Row} from 'antd';

function Dashboard(props) {
    const history = useHistory();

    const [language, setLanguage] = useState('en');
    const [pageNumber, setPageNumber] = useState(1);
    const [items, setItems] = useState([]);

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
        <div>
            <button onClick={() => fetchAdv()}>TRY</button>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            { items.map(item => <Item {...item}/>)}
            </Row>
        </div>
    )

}

export default Dashboard
