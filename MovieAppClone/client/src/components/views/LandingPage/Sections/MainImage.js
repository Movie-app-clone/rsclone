import React from 'react'
import { Typography } from 'antd';
const { Title } = Typography;

function MainImage(props) {
    return (
        <div style={{
            backgroundImage: `url('${props.image}')`,
            width: '100%',
            height: '55rem',
            backgroundSize:'cover, 100%',
            backgroundPosition: 'center, center',
            position: 'relative'
            }}>
            <div>
                <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem' }}>
                    <Title style={{ color: 'white' }} level={2} > {props.title}</Title>
                    <p style={{ color: 'white', fontSize: '1rem' }}>{props.text}</p>
                </div>
            </div>

        </div>
    )
}

export default MainImage