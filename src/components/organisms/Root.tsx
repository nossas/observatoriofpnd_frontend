import { Button, Flex, Layout } from 'antd'
import { DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons';
import { Explore } from 'components/molecules'
import { Filter } from 'components/atoms'
import { Outlet } from '@tanstack/react-router'
import { useState } from 'react'

const { Content, Sider } = Layout

export const Root = () => {
    const [ collapsed, setCollapsed ]  = useState(false)

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible trigger={null} collapsed={collapsed} collapsedWidth={50} width={374} theme="light">
                <Flex justify="space-between" align="center" style={{padding: "12px"}}>
                    <Flex gap={10}>
                        {!collapsed &&
                            <>
                                <Filter/>
                                <p style={{fontWeight: "bold"}}>Explore</p>
                            </>
                        }
                    </Flex>

                    <Button
                        type="text"
                        icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined /> }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ float: 'right' }}                        
                    />
                </Flex>

                <Explore collapsed={collapsed}/>
            </Sider>

            <Layout style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Content style={{ display: 'flex', flex: 1 }}>
                    <div style={{ alignItems: 'center', display: 'flex', flex: 1, justifyContent: 'center' }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}
